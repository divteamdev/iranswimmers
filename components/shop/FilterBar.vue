<script setup>
import { ref, computed } from 'vue';
import { Button } from '~/components/ui/button';

const props = defineProps({
  view: {
    type: String,
    default: 'grid',
    validator: (value) => ['grid', 'list'].includes(value)
  },
  filter: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['filter', 'change-view']);

const currentView = computed({
  get: () => props.view,
  set: (value) => emit('change-view', value)
});

const handleFilterClick = () => {
  emit('filter');
};

const setView = (view) => {
  if (view !== currentView.value) {
    currentView.value = view;
  }
};
</script>

<template>
  <div class="bg-primary rounded-lg flex justify-between p-4">
    <Button
        variant="accent"
        class="hover:bg-background/95"
        :class="{ 'bg-background/95 text-primary': filter }"
        @click="handleFilterClick"
    >
      <Icon name="hugeicons:filter" class="text-xl" />
      فیلتر
    </Button>

    <div>
      <Button
          size="icon"
          variant="accent"
          class="rounded-l-none"
          :class="{ 'bg-background/95 text-primary': currentView === 'grid' }"
          @click="setView('grid')"
      >
        <Icon name="hugeicons:grid-view" />
      </Button>
      <Button
          size="icon"
          variant="accent"
          class="rounded-r-none"
          :class="{ 'bg-background/95 text-primary': currentView === 'list' }"
          @click="setView('list')"
      >
        <Icon name="hugeicons:list-view" />
      </Button>
    </div>
  </div>
</template>