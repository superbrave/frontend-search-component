import "regenerator-runtime/runtime";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

function getConnector(env, lang, country) {
  let countrySuffix = country ? `-${country}` : ''

  return new AppSearchAPIConnector({
    engineName: "dokteronline-" + env + "-" + lang + countrySuffix,
    hostIdentifier: "host-h892yb",
    endpointBase:
      "https://2f98e35e63fa458c89886be577b61301.ent-search.eu-central-1.aws.cloud.es.io",
    searchKey: "search-rrti3qoef44ys27fa2y2hbeu",
  });
}

export default function (env, lang, country) {
  return {
    debug: env === "dev",
    apiConnector: getConnector(env, lang, country),
    searchQuery: {
      resultsPerPage: 50,
      disjunctiveFacets: ["type"],
      facets: {
        type: {
          type: "value",
        },
      },
    },
  };
}
