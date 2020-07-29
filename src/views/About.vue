<template>
  <div class="about">
    <h1>About Folded Map</h1>
    <p>This capstone was inspired by Englewood photographer/activist Tonika Lewis Johnson's <a href="https://www.foldedmapproject.com/">Folded Map™ Project</a>, which "visually connects residents who live at corresponding addresses on the North and South Sides of Chicago" in an effort to interrogate the impact of decades of urban segregation and inequitable community investment.</p>
    <p>Upon starting the project, I reached out to Tonika about the idea of an app that would expand upon the scope of her project by allowing Chicago residents to "match" with Map Twins on their own (without requiring her involvement to facilitate that connection). Ideally, it would be democratized supplement to/extension of her artistic vision, intended to break down borders and spark connections that have been foreclosed again and again by segregation. Tonika responded to let me know that she's already been working with an educational game developer on a Folded Map app, but she nonetheless welcomed me, graciously, to build my own test/sample app. 
    </p>
    <figure>
      <img src="https://images.squarespace-cdn.com/content/v1/5c3e6481372b967a3c910d12/1554129063585-WEVLS876UYGSGQZ2ZAUU/ke17ZwdGBToddI8pDm48kEhkXuElnYWSDHt82vrng7p7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0nQwvinDXPV4EYh2MRzm-RQtVDBUITpfXimS-6dUM9XGraGK2y7qAEstHvCd2BSkyQ/Copy+of+TogetherOnWADEporch.jpg?format=2500w" width="600">
      <figcaption><small>Map Twins Nanette and Wade together on Wade’s porch. Photo by Tonika Johnson.</small></figcaption>
    </figure>
    <h2>Recommended Reading</h2>
    <p><small><a href="https://us.macmillan.com/books/9781250118332"><em>The South Side: A Portrait of Chicago and American Segregation</em> by Natalie Y. Moore</a></small></p>
    <p><small><a href="https://www.theatlantic.com/magazine/archive/2014/06/the-case-for-reparations/361631/">"The Case for Reparations" by Ta-Nehisi Coates</a></small></p>
    <p><small><a href="https://wwnorton.com/books/9781631492853"><em>The Color of Law: A Forgotten History of How Our Government Segregated America</em> by Richard Rothstein</a></small></p>
    <p><small><a href="https://press.uchicago.edu/ucp/books/book/chicago/G/bo27506579.html"><em>Ghosts in the Schoolyard: Racism and School Closings on Chicago's South Side</em> by Eve L. Ewing</a></small></p>
    <p><small><a href="https://www.ucpress.edu/book/9780520286498/chicago-on-the-make"><em>Chicago on the Make: Power and Inequality in a Modern City</em> by Andrew J. Diamond</a></small></p>
    <p><small><a href="https://beltpublishing.com/products/battle"><em>The Battle of Lincoln Park: Urban Renewal and Gentrification in Chicago</em> by Daniel Kay Hertz</a></small></p>
    <p><small>"Chicago is one of the most segregated yet diverse cities in America. Chicagoans typically don't live, work or play together. Unlike many other major U.S. cities, no one race dominates. We are about equal parts black, white and Latino, each group clustered in various enclaves... Our mayors have touted and promoted Chicago as a world-class city... Yet Chicago is compromised by the specter of segregation, which is often swept under the rug. We can't honestly talk about problems such as violence and unemployment without addressing segregation. Throughout the twentieth century, black families faced white violence when they dared to move into white neighborhoods. Redlining, bad mortgages, racial steering and failed school policies led to the northern version of Jim Crow, all of which had a lasting effect. Today more than half of the black population in Chicago lives in only 20 of the city's 77 communities." – Natalie Y. Moore, <em>The South Side: A Portrait of Chicago and American Segregation</em></small></p>
    <h2>How This App Works</h2>
    <p>In Tonika Johnson's project, Map Twins are people who share the same street and house number, but live on mirroring N/S sides of the city (e.g., 6900 N Paulina St and 6900 S Paulina St, addresses that are roughly 13.5 miles apart). This app matches Chicagoans based on that definition, but it also attempts to take into account the many Chicagoans who live either on E/W streets or on N/S streets that don't span the entire city.</p>
    <p>When a new user signs up and provides their address, the app sends a GET request containing their input address to a third-party API that returns standardized address info and lat/long coordinates. It then checks for the aforementioned same-street/same-house number condition. If that condition isn't met, it uses the average latitude of Madison Street's N/S dividing line to make another API request (this time using reverse geocoding) to find the nearest address to a coordinate containing the input address' longitude and its mirroring latitude.</p>
    <p>In addition to matching Map Twins, the app assigns users to a Block Twin Community (which includes members of their own block and members of the block that mirrors their own. These half-mile by half-mile "blocks" are based on Chicago's grid system. (If you're unfamiliar with that grid system, imagine the city of Chicago as a sheet of graph paper with the official city center (the intersection at State and Madison) as the (0,0) x,y axis point. In this app, the block that's eight blocks west and nine blocks <em>south</em> of that point is paired with the block that's eight blocks west and nine blocks <em>north</em> of that point.)</p>
    <h2>App Limitations</h2>
    <p>Because this is a sample app, the number of blocks that have been seeded into the backend database is relatively limited. But the <em>primary</em> limitation of this app, in my mind, is its reliance on the "official" N/S dividing line of Madison Street, an arbitrary division that ignores the real geographic center of Chicago. <a href="https://www.wbez.org/stories/the-heart-of-the-city-finding-chicagos-geographic-center/422a6445-662e-49eb-8064-b1af828085b3">Depending on whom you ask</a> (and which land annexations you take into account), the <em>actual</em> center of the city is located at W 31st and S Western, roughly a half-hour 'L' ride southwest of State and Madison.</p>
    <p>To be fair, the use of an unofficial (but geographically accurate) city center would detract from the symbolic value of Tonika Johnson's photographed address pairings. But then again, that center would arguably be more representative of the city and its people. Not to mention that the use of an unofficial center might allow residents of Chicago's West Side—another area that has suffered from prolonged civic disinvestment—to be more easily drawn into the fold. (Residents of Austin, for instance, might be paired with residents of Lincoln Park or River North.)</p>
  </div>
</template>

<style>
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