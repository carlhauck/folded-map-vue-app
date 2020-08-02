<template>
  <div class="about">
    <div class="section section-nude-gray">
      <div class="container container-tim">
        <div class="row">
          <div class="col-md-9 ml-auto mr-auto">
            <h2>About Folded Map</h2>
            <p>This web app, built as a capstone for Actualize Coding Bootcamp, was inspired by Englewood photographer/activist Tonika Lewis Johnson's <a href="https://www.foldedmapproject.com/">Folded Map™</a>. Folded Map "visually connects residents who live at corresponding addresses on the North and South Sides of Chicago" in an effort to interrogate the impact of decades of urban segregation and inequitable community investment.</p>
            <p>Upon starting work on this app, I reached out to Tonika about the idea: to expand upon the scope of her project by allowing Chicago residents to "match" with Map Twins on their own (without requiring her involvement to facilitate that connection). Ideally, it would serve as a democratized supplement to/extension of her artistic vision, something that could help break down interpersonal borders and spark connections that have been foreclosed again and again by segregation. Tonika responded to let me know that she's already been working with an educational game developer on a Folded Map app, but she nonetheless welcomed and encouraged me, graciously, to build my own test/sample app.</p>
            <div class="card card-raised page-carousel">
              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1" class></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2" class></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item active">
                    <img class="d-block img-fluid" src="../.././public/assets/img/maptwin1.jpg" alt="First slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block img-fluid" src="../.././public/assets/img/maptwin2.jpg" alt="Second slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block img-fluid" src="../.././public/assets/img/maptwin3.jpg" alt="Third slide">
                  </div>
                </div>
                <a class="left carousel-control carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="fa fa-angle-left"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="fa fa-angle-right"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
            <figcaption><small>Nanette, South Side Englewood resident, and Wade, North Side Edgewater resident, pose together on Wade’s front porch and in front of each other's homes. All photos by Tonika Johnson.</small></figcaption>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section section-gray">
      <div class="container container-tim">
        <div class="row">
          <div class="col-md-9 ml-auto mr-auto">
            <h3>Recommended Reading</h3>
            <ul>
              <li><a href="https://us.macmillan.com/books/9781250118332"><em>The South Side: A Portrait of Chicago and American Segregation</em></a> by Natalie Y. Moore</li>
              <li><a href="https://www.theatlantic.com/magazine/archive/2014/06/the-case-for-reparations/361631/">"The Case for Reparations"</a> by Ta-Nehisi Coates</li>
              <li><a href="https://wwnorton.com/books/9781631492853"><em>The Color of Law: A Forgotten History of How Our Government Segregated America</em></a> by Richard Rothstein</li>
              <li><a href="https://press.uchicago.edu/ucp/books/book/chicago/G/bo27506579.html"><em>Ghosts in the Schoolyard: Racism and School Closings on Chicago's South Side</em></a> by Eve L. Ewing</li>
              <li><a href="https://www.ucpress.edu/book/9780520286498/chicago-on-the-make"><em>Chicago on the Make: Power and Inequality in a Modern City</em></a> by Andrew J. Diamond</li>
              <li><a href="https://beltpublishing.com/products/battle"><em>The Battle of Lincoln Park: Urban Renewal and Gentrification in Chicago</em></a> by Daniel Kay Hertz</li>
            </ul>
            <p>"Chicago is one of the most segregated yet diverse cities in America. Chicagoans typically don't live, work or play together. Unlike many other major U.S. cities, no one race dominates. We are about equal parts black, white and Latino, each group clustered in various enclaves... Our mayors have touted and promoted Chicago as a world-class city... Yet Chicago is compromised by the specter of segregation, which is often swept under the rug. We can't honestly talk about problems such as violence and unemployment without addressing segregation. Throughout the twentieth century, black families faced white violence when they dared to move into white neighborhoods. Redlining, bad mortgages, racial steering and failed school policies led to the northern version of Jim Crow, all of which had a lasting effect. Today more than half of the black population in Chicago lives in only 20 of the city's 77 communities."</p>
            <p class="text-right">– Natalie Y. Moore, <em>The South Side: A Portrait of Chicago and American Segregation</em></p>
          </div>
        </div>  
      </div>
    </div>
    
    <div class="section section-nude-gray">
      <div class="container container-tim">
        <div class="row">
          <div class="col-md-9 ml-auto mr-auto">
            <h3>How This App Works</h3>
            <p>In Tonika Johnson's project, Map Twins are people who share the same street and house number, but live on mirroring N/S sides of the city (e.g., 6900 N Paulina St and 6900 S Paulina St, addresses that are roughly 13.5 miles apart). This app matches Chicagoans based on that definition, but it also attempts to take into account the many Chicagoans who live either on E/W streets or on N/S streets that don't span the entire city.</p>
            <p>When a new user signs up and provides their address, the app sends a GET request containing their input address to a third-party API that returns standardized address info and lat/long coordinates. It then checks for the aforementioned same-street/same-house number condition. If that condition isn't met, it uses the average latitude of Madison Street's N/S dividing line to make another API request (this time using reverse geocoding) to find the nearest address to a coordinate containing the input address' longitude and its mirroring latitude.</p>
            <p>In addition to matching Map Twins, the app assigns users to a Block Twin Community (which includes members of their own block and members of the block that mirrors their own. These half-mile by half-mile "blocks" are based on Chicago's grid system. (If you're unfamiliar with that grid system, imagine the city of Chicago as a sheet of graph paper with the official city center (the intersection at State and Madison) as the (0,0) x,y axis point. In this app, the block that's eight blocks west and nine blocks <em>south</em> of that point is paired with the block that's eight blocks west and nine blocks <em>north</em> of that point.)</p>
          </div>
        </div>
      </div>
      <div class="container container-tim">
        <div class="row">
          <div class="col-md-9 ml-auto mr-auto">
            <h3>Limitations</h3>
            <p>Because this is a sample app, the number of blocks that have been seeded into the backend database is relatively limited. But the <em>primary</em> limitation of this app, in my mind, is its reliance on the "official" N/S dividing line of Madison Street, an arbitrary division that ignores the real geographic center of Chicago. <a href="https://www.wbez.org/stories/the-heart-of-the-city-finding-chicagos-geographic-center/422a6445-662e-49eb-8064-b1af828085b3">Depending on whom you ask</a> (and which land annexations you take into account), the <em>actual</em> center of the city is located at W 31st and S Western, roughly a half-hour 'L' ride southwest of State and Madison.</p>
            <p>To be fair, the use of an unofficial (but geographically accurate) city center would detract from the symbolic value of Tonika Johnson's photographed address pairings. But then again, that center would arguably be more representative of the city and its people. Not to mention that the use of an unofficial center might allow residents of Chicago's West Side—another area that has suffered from prolonged civic disinvestment—to be more easily drawn into the fold. (Residents of Austin, for instance, might be paired with residents of Lincoln Park or River North.)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-gray">
      <div class="container container-tim">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-2 ml-auto mr-auto text-center">
            <!-- GitHub -->
            <a href="https://github.com/carlhauck">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>logo-github</title><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#66615B" d="M23.99845,0.59265C10.74637,0.59265,0,11.33769,0,24.59404 c0,10.60258,6.87606,19.59804,16.41386,22.77204c1.20004,0.22012,1.63806-0.52082,1.63806-1.15686 c0-0.56974-0.02077-2.07903-0.03241-4.08188c-6.67598,1.45035-8.08463-3.21718-8.08463-3.21718 c-1.09131-2.77253-2.66469-3.51067-2.66469-3.51067c-2.17907-1.4891,0.16487-1.4589,0.16487-1.4589 c2.40847,0.16973,3.67612,2.47329,3.67612,2.47329c2.14091,3.66758,5.6171,2.60854,6.98465,1.99416 c0.21805-1.55098,0.83804-2.60854,1.52373-3.20849c-5.32935-0.60569-10.93201-2.66468-10.93201-11.86154 c0-2.62004,0.93513-4.76241,2.47034-6.4401c-0.24678-0.60716-1.07038-3.0473,0.23529-6.35155c0,0,2.01508-0.64532,6.59981,2.46033 c1.91431-0.53232,3.9674-0.79855,6.00842-0.80783c2.03807,0.00928,4.09131,0.27551,6.00842,0.80783 c4.58193-3.10565,6.59333-2.46033,6.59333-2.46033c1.30935,3.30425,0.48561,5.74439,0.23883,6.35155 c1.53816,1.67769,2.46695,3.82007,2.46695,6.4401c0,9.21985-5.61135,11.24863-10.95794,11.84283 c0.86175,0.74094,1.62936,2.20573,1.62936,4.44447c0,3.20848-0.02947,5.79699-0.02947,6.5839 c0,0.64178,0.43228,1.38847,1.65029,1.15406C41.12967,44.18338,48,35.19382,48,24.59404 C48,11.33769,37.25348,0.59265,23.99845,0.59265z"></path></g></svg>
            </a>
          </div>
          <div class="col-md-2 ml-auto mr-auto text-center">
            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/in/carlhauck/">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>logo-linkedin</title><g fill="#66615B"><path fill="#66615B" d="M46,0H2C0.9,0,0,0.9,0,2v44c0,1.1,0.9,2,2,2h44c1.1,0,2-0.9,2-2V2C48,0.9,47.1,0,46,0z M14.2,40.9H7.1V18 h7.1V40.9z M10.7,14.9c-2.3,0-4.1-1.8-4.1-4.1c0-2.3,1.8-4.1,4.1-4.1c2.3,0,4.1,1.8,4.1,4.1C14.8,13,13,14.9,10.7,14.9z M40.9,40.9 h-7.1V29.8c0-2.7,0-6.1-3.7-6.1c-3.7,0-4.3,2.9-4.3,5.9v11.3h-7.1V18h6.8v3.1h0.1c0.9-1.8,3.3-3.7,6.7-3.7c7.2,0,8.5,4.7,8.5,10.9 V40.9z"></path></g></svg>
            </a>
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 0.4em;
}
h3 {
  margin-bottom: 0.6em;
}
p {
  padding-bottom: 1.5em;
}
ul {
  padding-inline-start: 0px;
  list-style-type: none;
}
li {
  padding-bottom: 0.75em;
}
</style>

<script>
export default {
  data: function () {
    return {};
  },
  created: function () {},
  methods: {},
};
</script>