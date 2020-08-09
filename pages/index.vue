<template>
  <div>
    <!--div v-if="!$isAMP" class="intro">
      <p>
        Follow one of links
      </p>
      <ul>
        <li>
          <a href="/amp">
            Simple AMP Page
          </a>
        </li>
        <li>
          <a href="/story">
            AMP story
          </a>
        </li>
      </ul>
    </div>
    <div v-else>
    </div-->
    <amp-body>
      <amp-sidebar id="menu-sidebar" layout="nodisplay" side="left" class="w-full bg-gray-600">
        <amp-nested-menu layout="fill">
          <ul>
            <li>
              <h4 amp-nested-submenu-open>Open Sub-Menu</h4>
              <div amp-nested-submenu>
                <ul>
                  <li>
                    <h4 amp-nested-submenu-close>Go back</h4>
                  </li>
                  <li>
                    <h4 amp-nested-submenu-open>Open Another Sub-Menu</h4>
                    <div amp-nested-submenu>
                      <h4 amp-nested-submenu-close>Go back</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="https://amp.dev/">Link</a>
            </li>
          </ul>
        </amp-nested-menu>
      </amp-sidebar>
      <amp-sidebar id="profile-sidebar" layout="nodisplay" side="right" class="w-full bg-gray-600">
        <article>
          <header>
            <h1>about</h1>
          </header>
          <section>
            <h2>Message</h2>
            <p>本文・・・</p>
            <h2>About Me</h2>
            <p>本文・・・</p>
            <h2>Twitter</h2>
            <p>本文・・・</p>
            <h2>Github</h2>
            <p>本文・・・</p>
          </section>
        </article>
      </amp-sidebar>

      <amp-auto-ads type="adsense" data-ad-client="ca-pub-9175345651644872">
      </amp-auto-ads>

      <header class="flex flex-row flex-no-wrap justify-between items-center content-center">
        <button class="p-4 font-black" on="tap:menu-sidebar">
          <font-awesome-icon :icon="['fa', 'bars']" />
        </button>
        <h1 class="font-bold">kght6123.page</h1>
        <button class="p-4 font-black" on="tap:profile-sidebar">
          <font-awesome-icon :icon="['fa', 'house-user']" />
        </button>
      </header>

      <amp-carousel
        lightbox
        width="768"
        height="512"
        layout="responsive"
        type="slides"
      >
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B006_TP_V4.jpg" layout="responsive" width="768" height="512"></amp-img>
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B005_TP_V4.jpg" layout="responsive" width="768" height="512"></amp-img>
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/RD2020322F033_TP_V4.jpg" layout="responsive" width="768" height="512"></amp-img>
      </amp-carousel>

      <nav class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 p-2">
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <a class="block shadow-sm" href="http://aaaa">
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">記事のタイトル</h2>
            <p class="text-xs">記事の概要</p>
          </article>
        </a>
        <nuxt-link v-for="file in files" :key="file.slug" class="block shadow-sm" :to="`/content${file.path}`">
          <amp-img :src="file.thumbnailImageUrl" layout="responsive" width="799"
        height="534" class="rounded-t-sm"></amp-img>
          <article class="bg-gray-100 text-gray-800 rounded-b-sm p-2">
            <h2 class="font-medium">{{ file.title }}</h2>
            <p class="text-xs">{{ file.description }}</p>
          </article>
        </nuxt-link>
      </nav>
      <aside class="grid grid-cols-3 grid-rows-1 gap-2 p-2 justify-center items-center content-around justify-items-center">
        <amp-social-share type="twitter" class="w-full bg-gray-600 rounded-sm"></amp-social-share>
        <!--amp-social-share type="facebook" class="w-full bg-gray-600 rounded-sm"></amp-social-share-->
        <amp-social-share type="line" class="w-full bg-gray-600 rounded-sm"></amp-social-share>
        <amp-social-share type="system" class="w-full bg-gray-600 rounded-sm"></amp-social-share>
      </aside>
      <!--
      <h2>AMP is easy</h2>
      <p>
        Here is a responsive image carousel implemented in AMP. Tap
        on one of the images to enter the lightbox mode.
      </p>
      <amp-carousel
        type="slides"
        width="400"
        height="300"
        layout="responsive"
      >
        <amp-img
          src="https://unsplash.it/400/300?image=10"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
        <amp-img
          src="https://unsplash.it/400/300?image=11"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
        <amp-img
          src="https://unsplash.it/400/300?image=12"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
        <amp-img
          src="https://unsplash.it/400/300?image=13"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
      </amp-carousel>

      <h2>AMP is interactive</h2>

      <p>
        AMP provides a rich set of built-in actions for creating
        interactive websites.
      </p>

      <button on="tap:greeting.show">
        Show
      </button>
      <button on="tap:greeting.hide">
        Hide
      </button>
      <button on="tap:greeting.toggleVisibility">
        Toggle
      </button>
      <span id="greeting" hidden>Hello</span>

      <p>... and this is how you toggle a class attribute.</p>

      <button on="tap:greeting2.toggleClass(class='red')">
        Toggle red
      </button>
      <span id="greeting2">Hello</span>

      <h2>AMP is dynamic</h2>

      <p>
        amp-listは、CORS(Cross-Origin Resource Sharing)のJSONを返すURLからJSONを取得して、
        mustache構文で動的にHTMLを作ることができるYo-
      </p>
      <p>
        AMP offers different ways to render dynamic content on a page.
        With amp-list it's possible to client-side render data pulled
        in from a JSON endpoint.
      </p>

      <amp-list
        id="time"
        layout="fixed-height"
        height="18"
        src="https://playground.amp.dev/documentation/examples/api/time"
        binding="refresh"
        single-item
        items="."
      >
        <amp-mustache>
          <template v-pre>
            The time is: {{time}} <button on="tap:time.refresh">
              Refresh
            </button>
          </template>
        </amp-mustache>
      </amp-list>

      <p>
        amp-accordionは、アコーディオンUIを作れる。
      </p>

      <amp-accordion animate>
        <section>
          <h2>Section 1</h2>
          <p>Content in section 1.</p>
        </section>
        <section>
          <h2>Section 2</h2>
          <div>Content in section 2.</div>
        </section>
        <section>
          <h2>Section 3</h2>
          <amp-img
            src="https://unsplash.it/320/256?image=14"
            width="320"
            height="256"
          ></amp-img>
        </section>
      </amp-accordion>

      <p></p>
      <amp-embedly-card
        data-url="https://twitter.com/AMPhtml/status/986750295077040128"
        layout="responsive"
        width="150"
        height="80"
        data-card-theme="dark"
        data-card-controls="0"
      >
      </amp-embedly-card>

      <amp-embedly-card
        data-url="https://www.youtube.com/watch?v=lBTCB7yLs8Y"
        layout="responsive"
        width="100"
        height="50"
      >
      </amp-embedly-card>

      <p>Fit Text</p>
      <div class="fixedblock">
        <amp-fit-text width="200" height="200" layout="responsive" min-font-size="40">
          Lorem ipsum dolor sit amet, has nisl nihil convenire et, vim at aeque
          inermis reprehendunt.
        </amp-fit-text>
      </div>

      <p>Gist</p>
      <amp-gist
        data-gistid="a19e811dcd7df10c4da0931641538497"
        data-file="hi.c"
        layout="fixed-height"
        height="185"
      >
      </amp-gist>
      <amp-gist
        data-gistid="b9bb35bc68df68259af94430f012425f"
        layout="fixed-height"
        height="225"
      >
      </amp-gist>

      <p>AMP iframe</p>
      <amp-iframe
        width="200"
        height="100"
        sandbox="allow-scripts allow-same-origin"
        layout="responsive"
        frameborder="0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAyAS599A2GGPKTmtNr9CptD61LE4gN6oQ&q=iceland"
      >
      </amp-iframe>

      <p>
        AMP Image Lightbox
      </p>
      <amp-image-lightbox id="lightbox1" layout="nodisplay"></amp-image-lightbox>

      <amp-img
        on="tap:lightbox1"
        role="button"
        tabindex="0"
        src="https://www.pakutaso.com/shared/img/thumb/redstymtA018_TP_V4.jpg"
        layout="responsive"
        width="768"
        height="512"
      ></amp-img>

      <amp-img
        on="tap:lightbox1"
        role="button"
        tabindex="0"
        src="https://www.pakutaso.com/shared/img/thumb/RDS20719B007_TP_V4.jpg"
        layout="responsive"
        width="768"
        height="512"
      ></amp-img>

      <p>
        AMP Image Slider
      </p>
      <amp-image-slider layout="responsive" width="768" height="512">
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/REDSUG074C004_TP_V4.jpg" width="768"
            height="512" alt="A green apple"></amp-img>
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/redstymtC020_TP_V4.jpg" width="768"
            height="512" alt="A red apple"></amp-img>
        <div first>This apple is green</div>
        <div second>This apple is red</div>
      </amp-image-slider>

      <p>
        amp-lightbox
      </p>
      <button on="tap:quote-lb">See Quote</button>
      <amp-lightbox id="quote-lb" layout="nodisplay">
        <blockquote>
          "Don't talk to me about JavaScript fatigue" - Horse JS
        </blockquote>
        <button on="tap:quote-lb.close">Nice!</button>
      </amp-lightbox>

      <p>
        Lightbox with amp-img
      </p>
      <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B006_TP_V4.jpg" width="768" height="512" lightbox></amp-img>
      <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B005_TP_V4.jpg" width="768" height="512" lightbox></amp-img>
      <amp-img src="https://www.pakutaso.com/shared/img/thumb/RD2020322F033_TP_V4.jpg" width="768" height="512" lightbox></amp-img>

      <p>
        Lightbox with amp-carousel
      </p>
      <amp-carousel
        lightbox
        width="1600"
        height="900"
        layout="responsive"
        type="slides"
      >
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B006_TP_V4.jpg" width="768" height="512"></amp-img>
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B005_TP_V4.jpg" width="768" height="512"></amp-img>
        <amp-img src="https://www.pakutaso.com/shared/img/thumb/RD2020322F033_TP_V4.jpg" width="768" height="512"></amp-img>
      </amp-carousel>

      <p>
        AMP Selector
      </p>
      <form action="/" method="get" target="_blank" id="form1">
        <amp-selector layout="container" name="single_image_select">
          <ul>
            <li>
              <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="1"></amp-img>
            </li>
            <li>
              <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="2"></amp-img>
            </li>
            <li option="na" selected>None of the Above</li>
          </ul>
        </amp-selector>
        <amp-selector layout="container" name="multi_image_select" multiple>
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="1"></amp-img>
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="2"></amp-img>
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="3"></amp-img>
        </amp-selector>
        <amp-selector layout="container" name="multi_image_select_1" multiple>
          <amp-carousel id="carousel-1" width="200" height="60" controls>
            <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="a"></amp-img>
            <amp-img
              src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg"
              width="768"
              height="512"
              option="b"
              selected
            ></amp-img>
            <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="c"></amp-img>
            <amp-img
              src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg"
              width="768"
              height="512"
              option="d"
              disabled
            ></amp-img>
          </amp-carousel>
        </amp-selector>
      </form>
      <amp-selector
        layout="container"
        name="multi_image_select_2"
        multiple
        form="form1"
      >
        <amp-carousel id="carousel-1" width="400" height="300" type="slides" controls>
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="a"></amp-img>
          <amp-img
            src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512"
            option="b"
            selected
          ></amp-img>
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="c"></amp-img>
          <amp-img src="https://www.pakutaso.com/shared/img/thumb/RDS20719B011_TP_V4.jpg" width="768" height="512" option="d"></amp-img>
        </amp-carousel>
      </amp-selector>

      <p>AMP Share</p>
      <amp-social-share type="twitter"></amp-social-share>

      <p>AMP Time ago</p>
      <amp-timeago
        layout="fixed"
        width="160"
        height="20"
        datetime="2017-04-11T00:37:33.809Z"
        locale="ja"
      >
        Saturday 11 April 2017 00.37
      </amp-timeago>

      <p>AMP Twitter</p>
      <amp-twitter
        width="375"
        height="472"
        layout="responsive"
        data-tweetid="885634330868850689"
      >
      </amp-twitter>
      <amp-twitter
        width="375"
        height="472"
        layout="responsive"
        data-tweetid="638793490521001985"
      >
        <blockquote placeholder>
          <p>
            I only needed to change some CSS.
            <a href="http://t.co/LvjLbjgY9F">pic.twitter.com/LvjLbjgY9F</a>
          </p>
          &mdash; Malte Ubl (@cramforce)
          <a href="https://twitter.com/cramforce/status/638793490521001985"
            >September 1, 2015</a
          >
        </blockquote>
      </amp-twitter>
      <amp-twitter
        width="390"
        height="330"
        layout="responsive"
        data-tweetid="855178606556856320"
      >
        <blockquote placeholder>
          <p>
            What are 5 common misconceptions people often have about AMP? Find out on
            today&#39;s installment of Amplify:
            <a href="https://t.co/kaSvV8SQtI">https://t.co/kaSvV8SQtI</a>
            <a href="https://t.co/Cu9VYOmiKV">pic.twitter.com/Cu9VYOmiKV</a>
          </p>
          &mdash; AMP Project (@AMPhtml)
          <a href="https://twitter.com/AMPhtml/status/855178606556856320"
            >April 20, 2017</a
          >
        </blockquote>
        <div fallback>
          An error occurred while retrieving the Tweet. It might have been deleted.
        </div>
      </amp-twitter>

      <p>AMP Youtube</p>
      <amp-youtube
        data-videoid="mGENRKrdoGY"
        layout="responsive"
        width="480"
        height="270"
      ></amp-youtube>

      <amp-youtube
        id="myLiveChannel"
        data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
        width="358"
        height="204"
        layout="responsive"
      >
        <amp-img
          src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
          placeholder
          layout="fill"
        />
      </amp-youtube>

      <p>Here is another example, a simple calculator implemented with amp-bind:</p>

      <input
        type="number"
        on="input-debounced:AMP.setState({a: event.valueAsNumber})"
        value="0"
      > +
      <input
        type="number"
        on="input-debounced:AMP.setState({b: event.valueAsNumber})"
        value="0"
      > =
      <span [text]="a + b">0</span>
      -->
    </amp-body>
  </div>
</template>

<script>
export default {
  // async asyncData({ params, $content }) {
  //   const files = await $content('/', { deep: true }).limit(10).fetch()
  //   console.log('asyncData files'/*, files*/)
  //   return { files }
  // },
  // activated() {
  //   // 最後の fetch から30秒以上経っていれば、fetch を呼び出します
  //   if (this.$fetchState.timestamp <= Date.now() - 3000) {
  //     this.$fetch()
  //   }
  // },
  async fetch() {
    // console.log('fetch check', this.$fetchState.timestamp, Date.now() - 3000)
    // if (this.$fetchState.timestamp <= Date.now() - 3000) {
      const files = await this.$nuxt.context.$content('/', { deep: true }).limit(10).sortBy('updatedAt', 'desc').fetch()
      console.log('fetch files', files[0], this.$fetchState)
      this.files = files
    // }
  },
  // fetchOnServer: false,
  amp: 'only',
  head () {
    return {
      title: 'AMP module for Nuxtjs'
    }
  },
  data() {
    return {
      files: []
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
/*
body > * {
  margin: 0.5rem 0 0.5rem 0.5rem;
}
*/
amp-carousel {
  margin: 0;
}
input[type=number] {
  width: 2rem;
}
.red {
  color: red;
}
</style>