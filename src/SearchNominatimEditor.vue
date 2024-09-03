<template>
  <AbstractConfigEditor @submit="apply" v-bind="{ ...$attrs, ...$props }">
    <v-container class="py-0 px-1">
      <v-row
        no-gutters
        v-for="key in ['url', 'state', 'city', 'countrycode']"
        :key="key"
      >
        <v-col>
          <VcsLabel :html-for="key">
            {{ $t(`searchNominatim.${key}`) }}
          </VcsLabel>
        </v-col>
        <v-col>
          <VcsTextField :id="key" clearable v-model.trim="localConfig[key]" />
        </v-col>
      </v-row>
      <!-- XXX extent -->
      <v-row no-gutters>
        <v-col>
          <VcsLabel html-for="limit">
            {{ $t('searchNominatim.limit') }}
          </VcsLabel>
        </v-col>
        <v-col>
          <VcsTextField
            id="limit"
            clearable
            type="number"
            v-model.number="localConfig.limit"
          />
        </v-col>
      </v-row>
    </v-container>
  </AbstractConfigEditor>
</template>

<script>
  import { VContainer, VRow, VCol } from 'vuetify/components';
  import { VcsLabel, VcsTextField, AbstractConfigEditor } from '@vcmap/ui';
  import { ref } from 'vue';
  import Nominatim from './nominatim.js';

  export default {
    name: 'SearchNominatimEditor',
    title: 'Search Nominatim Editor',
    components: {
      VContainer,
      VRow,
      VCol,
      AbstractConfigEditor,
      VcsLabel,
      VcsTextField,
    },
    props: {
      getConfig: {
        type: Function,
        required: true,
      },
      setConfig: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const localConfig = ref({});
      const defaultOptions = Nominatim.getDefaultOptions();
      props.getConfig().then((config) => {
        localConfig.value = Object.assign(defaultOptions, config);
      });

      const apply = async () => {
        await props.setConfig(localConfig.value);
      };

      return {
        localConfig,
        apply,
      };
    },
  };
</script>

<style scoped></style>
