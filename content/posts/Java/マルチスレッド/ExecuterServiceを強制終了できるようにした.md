---
sortNo: 13
title: ExecuterServiceを強制終了できるようにした
eyecatchImage: ['/images/posts/java-logo.jpg',800,533]
thumbnailImage: ['/images/posts/sm/java-logo.jpg',800,533]
tags: ['Java']
---

## 解説

JavaのExecutorServiceに対して

死なないタスクにInterruptedExceptionを発生させて、

任意のタイミングで強制終了させることができる`ExecutorServiceWrapper`とそのWrapperを簡単に作る`ExecutorServiceUtil`を作りました

並行処理が中途半端でも良いので完全に停止させたい時や、常駐処理を停止したいときに使います。

どなたかの参考になれば、、、、と思います。

（loggerは任意のものに置き換えて使ってください！）

## ソースコード

```java
import java.util.Collection;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ExecutorServiceUtil {
	
	/**
	 * ユニットテスト
	 * @param args
	 */
	public static void main(final String... args) {
		
		final Logger logger = /* 任意のloggerに置き換える */;
		
		final int THROW = 1;
		final int TRY_CATCH = 2;
		final int TRY_CATCH_NOT_RTN = 3;
		
		class C1 implements Callable<Boolean> {
			
			private final long milliseconds;
			private final int callType;
			
			private C1(final long milliseconds, final int callType) {
				this.milliseconds = milliseconds;
				this.callType = callType;
			}
			
			@Override
			public Boolean call() throws Exception {
				
				switch(callType) {
					case THROW :
						return callForThrow();
					case TRY_CATCH :
						return callForTryCatch();
					case TRY_CATCH_NOT_RTN :
						return callForTryCatchNotReturn();
					default :
						return false;
				}
			}
			
			/**
			 * エラーにしてすぐ死ぬ
			 * @return
			 * @throws InterruptedException
			 */
			private Boolean callForThrow() throws InterruptedException {
				logger.info("callForThrow -start-");
				Thread.sleep(this.milliseconds);
				logger.info("callForThrow -finish-");
				return true;
			}
			
			/**
			 * catchして正常返して死ぬ
			 * @return
			 */
			private Boolean callForTryCatch() {
				try {
					logger.info("callForTryCatch -start-");
					Thread.sleep(this.milliseconds);
					logger.info("callForTryCatch -finish-");
					return true;
				} catch (InterruptedException e) {
					logger.error("callForTryCatch -error-");
					return false;
				}
			}
			
			/**
			 * catchして絶対死なない
			 * @return
			 */
			private Boolean callForTryCatchNotReturn() {
				while(true) {
					try {
						logger.info("callForTryCatchNotReturn -start-");
						Thread.sleep(this.milliseconds);
						logger.info("callForTryCatchNotReturn -finish-");
						return true;
					} catch (InterruptedException e) {
						logger.error("callForTryCatchNotReturn -error-");
						continue;
					}
				}
			}
		}
		
		logger.info("main -start-");
		
		// 下記のデフォルト時間を弄って検証する
		try (final ExecutorServiceWrapper esw = 
				newFixedThreadPool(3, new ExecutorServiceWrapper.ShutdownInfo(3, TimeUnit.SECONDS, logger));) {
			
			logger.info("main submit -start-");
			esw.submit(new C1(10 * 1000, THROW));
			esw.submit(new C1(10 * 1000, TRY_CATCH));
			esw.submit(new C1(10 * 1000, TRY_CATCH_NOT_RTN));
			
			esw.submit(new C1(10 * 1000, THROW));
			esw.submit(new C1(10 * 1000, THROW));
			
			logger.info("main sleep -start-");
			Thread.sleep(60 * 1000);
			
			logger.info("main shutdown -start-");
			
		} catch (final InterruptedException e) {
			logger.error(e.getClass().getName(), e);
		}
	}
	
	/**
	 * Executors.newFixedThreadPool＋ExecutorServiceWrapper生成を行う簡易メソッド
	 * 
	 * @param maxSize
	 * @param shutdownInfo
	 * @return
	 */
	public static ExecutorServiceWrapper newFixedThreadPool(final int maxSize, final ExecutorServiceWrapper.ShutdownInfo shutdownInfo) {
		// XXX JDK8以降 のExecutors.newWorkStealingPool(20);を使いたいが、並列実行の競合を減らすためなので、意味合いがnewFixedThreadPoolとちょっと違う。
		return new ExecutorServiceWrapper(Executors.newFixedThreadPool(maxSize), shutdownInfo);
	}
	
	/**
	 * Executors.newFixedThreadPool＋DeamonThread化＋ ExecutorServiceWrapper生成を行う簡易メソッド
	 * 
	 * @param maxSize
	 * @param shutdownInfo
	 * @return
	 */
	public static ExecutorServiceWrapper newFixedDeamonThreadPool(final int maxSize, final ExecutorServiceWrapper.ShutdownInfo shutdownInfo) {
		return new ExecutorServiceWrapper(Executors.newFixedThreadPool(maxSize, new DaemonThreadFactory()), shutdownInfo);
	}
	
	/**
	 * Executors.newCachedThreadPool＋DeamonThread化＋ ExecutorServiceWrapper生成を行う簡易メソッド
	 * 
	 * @param shutdownInfo
	 * @return
	 */
	public static ExecutorServiceWrapper newCachedDeamonThreadPool(final ExecutorServiceWrapper.ShutdownInfo shutdownInfo) {
		return new ExecutorServiceWrapper(Executors.newCachedThreadPool(new DaemonThreadFactory()), shutdownInfo);
	}
	
	/**
	 * ExecutorServiceをWrappし、AutoCloseableで終了処理を実装したクラス
	 * 
	 */
	public static class ExecutorServiceWrapper implements AutoCloseable, ExecutorService {
		
		private final ExecutorService es;
		private final ExecutorServiceWrapper.ShutdownInfo sdi;
		
		private ExecutorServiceWrapper(final ExecutorService es, final Logger logger) {
			super();
			this.es = es;
			this.sdi = new ExecutorServiceWrapper.ShutdownInfo(3, TimeUnit.SECONDS, logger);
		}
		
		private ExecutorServiceWrapper(final ExecutorService es, final ExecutorServiceWrapper.ShutdownInfo shutdownInfo) {
			super();
			this.es = es;
			this.sdi = shutdownInfo;
		}
		
		// -- ExecutorServiceの委譲メソッド -- start --
		
		@Override public boolean awaitTermination(long arg0, TimeUnit arg1) throws InterruptedException {
			return es.awaitTermination(arg0, arg1);
		}
		@Override public void execute(Runnable arg0) {
			es.execute(arg0);
		}
		@Override public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> arg0, long arg1, TimeUnit arg2)
				throws InterruptedException {
			return es.invokeAll(arg0, arg1, arg2);
		}
		@Override public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> arg0) throws InterruptedException {
			return es.invokeAll(arg0);
		}
		@Override public <T> T invokeAny(Collection<? extends Callable<T>> arg0, long arg1, TimeUnit arg2)
				throws InterruptedException, ExecutionException, TimeoutException {
			return es.invokeAny(arg0, arg1, arg2);
		}
		@Override public <T> T invokeAny(Collection<? extends Callable<T>> arg0) throws InterruptedException, ExecutionException {
			return es.invokeAny(arg0);
		}
		@Override public boolean isShutdown() {
			return es.isShutdown();
		}
		@Override public boolean isTerminated() {
			return es.isTerminated();
		}
		@Override public void shutdown() {
			es.shutdown();
		}
		@Override public List<Runnable> shutdownNow() {
			return es.shutdownNow();
		}
		@Override public <T> Future<T> submit(Callable<T> arg0) {
			return es.submit(arg0);
		}
		@Override public <T> Future<T> submit(Runnable arg0, T arg1) {
			return es.submit(arg0, arg1);
		}
		@Override public Future<?> submit(Runnable arg0) {
			return es.submit(arg0);
		}
		
		// -- ExecutorServiceの委譲メソッド -- end --
		
		@Override public void close() throws InterruptedException {
			ExecutorServiceUtil.shutdown(es, sdi.waitTime, sdi.waitTimeUnit, sdi.logger);
		}
		
		public static class ShutdownInfo {
			
			private final int waitTime;
			private final TimeUnit waitTimeUnit;
			private final Logger logger;
			
			public ShutdownInfo(final int waitTime, final TimeUnit waitTimeUnit, final Logger logger) {
				super();
				this.waitTime = waitTime;
				this.waitTimeUnit = waitTimeUnit;
				this.logger = logger;
			}
		}
	}
	
	
	/**
	 * DaemonThreadでExecutorServiceを作成するためのFactory
	 */
	public static class DaemonThreadFactory implements ThreadFactory {
		
		public Thread newThread(final Runnable r){
			final Thread t = new Thread(r);
			t.setDaemon(true);
			return t;
		}
	}
	
	/**
	 * ExecutorServiceをシャットダウンするための共通処理
	 * 
	 * @param es
	 * @param waitTime
	 * @param waitTimeUnit
	 * @param logger
	 */
	public static void shutdown(final ExecutorService es, final long waitTime, final TimeUnit waitTimeUnit, final Logger logger) {
		
		if(es == null) return;
		
		logger.info("shutdown ExecutorService.");
		es.shutdown();	// すべて終了してるとき、ココですぐ死ぬ
		
		try {
			if (!es.isTerminated()) {
				// 死んでないときに実行
				logger.info("awaitTermination ExecutorService.");
				
				// 死なないタスクにInterruptedExceptionを発生させて、指定時間待つ。
				final boolean exit = 
						es.awaitTermination(waitTime, waitTimeUnit);
				
				if(!exit) {
					// それでも死ななかったとき、強制シャットダウン
					logger.warn("shutdownNow ExecutorService.");
					final List<Runnable> notDieList = 
							es.shutdownNow();	// 実行されてなかったタスクは返され、実行中のタスクは処理続行される
					
					logger.warn("shutdownNow not Die size = "+notDieList.size());
					for (final Runnable notDie : notDieList) {
						logger.warn("shutdownNow not Die = "+notDie);
					}
				}
			}
		} catch (final InterruptedException e) {
			logger.error("InterruptedException.", e);
		}
	}
}
```
