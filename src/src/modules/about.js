export default function about() {
  const openSourceList = document.getElementById("openSourceList");
  if (openSourceList) {
    let template = _.template(
      `<div class=" m-1 p-1">
    <a href='<%= html_url %>' target='blank'><h4><%= name %></h4></a>
    <p class="text-sm"><%= description %></p>
  </div>
`
    );

    fetch(
      "https://api.github.com/users/shawnwildermuth/repos?type=owner&sort=pushed"
    )
      .then((result) => result.json())
      .then(function (data) {
        let results = _.filter(data, function (item) {
          return !item.fork && item.watchers_count > 0 && item.description;
        });
        results = _.orderBy(results, ["stargazers_count"], ["desc"]);
        _.forEach(_.take(results, 10), function (item) {
          const block = document.createElement("div");
          block.innerHTML = template(item);
          openSourceList.append(block);
        });
      });
  }
}
