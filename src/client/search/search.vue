<template>
  <div class="flex flex-col">
    <div class="flex justify-end">
      <a href="https://www.algolia.com/" target="_blank" class="w-40 my-2"
        ><img src="/img/algolia.svg" alt="Search by Algolia"
      /></a>
    </div>
    <div class="flex mb-4">
      <input
        class="flex-grow
               text-lg 
               p-2
               m-2
               text-gray-800
               font-sans
               border-0 
               outline-0 
               bg-gray-200 
               focus:ring-2 
             ring-yellow-500 
               rounded-lg"
        ref="searchInput"
        type="text"
        v-model="query"
        @keyup.enter="search()"
        placeholder="Search Here..."
        autofocus
      />
      <div class="my-1">
        <button class="btn btn-success" @click="search()">Search</button>
      </div>
    </div>
    <div v-if="message">{{ message }}</div>
    <div class="flex flex-col" v-if="found">
      <div class="text-sm text-gray-100" v-if="resultCount > 0">
        #/Results: {{ resultCount }} - Page {{ currentPage + 1 }} of
        {{ numPages }}
      </div>
      <div v-for="item in found" :key="item.objectID" class="mb-4">
        <a :href="item.url">
          <div
            class="p-1"
          >
            <h4 class="text-amber-500">{{ decode(item.title) }}</h4>
            <div class="mb-2">
              <i class="fas fa-calendar"></i>
              {{ new Date(item.date).toLocaleDateString() }}
            </div>
            <div class="text-base">{{ abbreviate(item.content) }}</div>
            <hr class="border-gray-500/50 mt-2"/>
          </div>
        </a>
      </div>
    </div>
    <div>
      <button @click="searchMore()" class="btn btn-success text-sm" v-if="more">
        Get More Results...
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import algoliasearch from "algoliasearch";
import code from "./code";
import { decode } from "html-entities";

export default defineComponent({
  setup() {
    const found: Ref<any> = ref([]);
    const query = ref("");
    const numPages = ref(0);
    const message = ref("");
    const pageSize = ref(10);
    const currentPage = ref(0);
    const resultCount = ref(0);

    const client = algoliasearch(
      [...code.code].reverse().join(""),
      [...code.app].reverse().join("")
    );
    const index = client.initIndex("wildermuth.com");

    const more = computed(() => numPages.value > currentPage.value + 1);

    async function searchMore() {
      if (query.value) {
        currentPage.value++;
        await performSearch();
      }
    }

    async function search() {
      if (query.value) {
        currentPage.value = 0;
        numPages.value = 0;
        resultCount.value = 0;
        await performSearch();
      }
    }

    async function performSearch() {
      try {
        message.value = "Searching...";
        found.value = [];
        const result = await index.search(query.value, {
          hitsPerPage: pageSize.value,
          page: currentPage.value,
        });

        if (result && result.hits && result.hits.length > 0) {
          found.value = result.hits.sort((a: any, b: any) =>
            new Date(a.date) < new Date(b.date) ? 1 : -1
          ) as any[];
          numPages.value = result.nbPages;
          resultCount.value = result.nbHits;
        }
      } catch (e) {
        message.value = "Error searching...";
        numPages.value = 0;
      } finally {
        message.value = "";
      }
    }

    function abbreviate(str: string) {
      const end = str.indexOf(" ", 250);
      if (end === -1) return decode(str);
      return decode(str.substring(0, end)) + "...";
    }

    return {
      found,
      abbreviate,
      query,
      decode,
      search,
      searchMore,
      numPages,
      message,
      more,
      resultCount,
      currentPage,
    };
  },
});
</script>
