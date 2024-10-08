<template>
  <AbstractConfigEditor @submit="apply" v-bind="{ ...$attrs, ...$props }">
    <VcsFormSection heading="searchNominatim.general">
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
        <v-row no-gutters>
          <v-col>
            <VcsLabel html-for="icon">
              {{ $t('searchNominatim.icon') }}
            </VcsLabel>
          </v-col>
          <v-col>
            <VcsTextField id="icon" v-model="localConfig.icon" />
          </v-col>
        </v-row>
      </v-container>
    </VcsFormSection>
    <v-row no-gutters>
      <VcsExtentEditor class="w-100" v-model="extent" />
    </v-row>
  </AbstractConfigEditor>
</template>

<script>
  import { VContainer, VRow, VCol } from 'vuetify/components';
  import { computed, ref } from 'vue';
  import {
    AbstractConfigEditor,
    VcsExtentEditor,
    VcsFormSection,
    VcsLabel,
    VcsTextField,
  } from '@vcmap/ui';
  import { Extent } from '@vcmap/core';
  import Nominatim from './nominatim.js';

  export default {
    name: 'SearchNominatimEditor',
    title: 'Search Nominatim Editor',
    components: {
      VContainer,
      VRow,
      VCol,
      AbstractConfigEditor,
      VcsExtentEditor,
      VcsFormSection,
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
      const defaultOptions = Nominatim.getDefaultOptions();
      const config = props.getConfig();
      const localConfig = ref(Object.assign(defaultOptions, config));

      const extent = computed({
        get() {
          return new Extent(
            localConfig.value.extent ?? { projection: { epsg: 4326 } },
          ).toJSON();
        },
        set(value) {
          localConfig.value.extent = value;
        },
      });

      const apply = () => {
        props.setConfig(localConfig.value);
      };

      return {
        localConfig,
        extent,
        apply,
      };
    },
  };
</script>

<style scoped></style>
