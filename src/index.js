import { version, name, mapVersion } from '../package.json';
import Nominatim from './nominatim.js';
import SearchNominatimEditor from './SearchNominatimEditor.vue';

/**
 * @param {NominatimSearchOptions} config - the configuration of this plugin instance, passed in from the app.
 * @returns {import("@vcmap/ui/src/vcsUiApp").VcsPlugin<T>}
 * @template {Object} T
 * @template {Object} S
 */
export default function searchNominatim(config) {
  let instance;
  let app;

  return {
    get name() {
      return name;
    },
    get version() {
      return version;
    },
    get mapVersion() {
      return mapVersion;
    },
    /**
     * @param {import("@vcmap/ui").VcsUiApp} vcsUiApp
     */
    initialize(vcsUiApp) {
      instance = new Nominatim(config);
      vcsUiApp.search.add(instance, name);
      app = vcsUiApp;
    },
    /**
     * @returns {NominatimSearchOptions}
     */
    toJSON() {
      return instance?.toJSON() || {};
    },
    getDefaultOptions() {
      return Nominatim.getDefaultOptions();
    },
    getConfigEditors() {
      return [
        {
          component: SearchNominatimEditor,
          infoUrlCallback: app?.getHelpUrlCallback(
            '/components/plugins/searchToolConfig.html#id_searchNominatimConfig_',
          ),
        },
      ];
    },
    i18n: {
      en: {
        searchNominatim: {
          general: 'General',
          name: 'Name',
          url: 'URL to Nominatim',
          state: 'State',
          city: 'City',
          countrycode: 'Country Code',
          limit: 'Maximum number of results',
          icon: 'Results icon',
          bbox: 'Bounding Box',
        },
      },
      de: {
        searchNominatim: {
          general: 'Allgemein',
          name: 'Name',
          url: 'URL zu Nominatim',
          state: 'Bundesland',
          city: 'Stadt',
          countrycode: 'Ländercode',
          limit: 'Maximale Anzahl Resultate',
          icon: 'Ergebnissymbol',
          bbox: 'Bounding Box',
        },
      },
    },
  };
}
