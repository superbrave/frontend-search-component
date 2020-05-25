import "regenerator-runtime/runtime";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

function getConnector(env, lang) {
  return new AppSearchAPIConnector({
    engineName: "dokteronline-" + env + "-" + lang,
    hostIdentifier: "host-h892yb",
    endpointBase:
      "https://35d2a6695b4246598942ab98200ac709.app-search.eu-central-1.aws.cloud.es.io",
    searchKey: "search-po4yowdaz11ib78z4jo535m6",
  });
}

export default function (env, lang) {
  return {
    debug: env === "dev",
    apiConnector: getConnector(env, lang),
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
