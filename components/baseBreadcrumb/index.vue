<script setup lang="ts">
import { computed } from 'vue';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb";

export interface BreadcrumbItem {
  text?: string;
  url?: string;
  slug?: string;
}

export interface FormattedBreadcrumb {
  title: string;
  href: string;
  slug?: string;
  disabled: boolean;
}

const props = defineProps({
  items: {
    type: Array as () => BreadcrumbItem[],
    required: true,
    default: () => []
  },
  categoryBasePath: {
    type: String,
    default: '/product-category'
  },
  homeRedirect: {
    type: String,
    default: '/shop'
  },
  homeText: {
    type: String,
    default: 'فروشگاه'
  }
});

const formattedBreadcrumbs = computed<FormattedBreadcrumb[]>(() => {
  if (!props.items || !Array.isArray(props.items)) {
    return [];
  }

  return props.items.map((item, index, array) => {
    let slug = '';
    // Check for category URLs
    if (item?.url && typeof item.url === 'string' && item.url.includes('category')) {
      const urlSegments = item.url.split('/');
      slug = urlSegments[urlSegments.length - 1];
    }

    // Use optional chaining and provide defaults
    let href = item?.url || '';
    let title = item?.text || '';

    // Handle home route special case
    if (index === 0 && href === '/') {
      href = props.homeRedirect;
      title = props.homeText;
    }

    // Handle category URLs
    if (href && typeof href === 'string' && href.includes('category')) {
      href = `${props.categoryBasePath}/${slug}`;
    }

    return {
      title,
      href,
      slug,
      disabled: index === array.length - 1
    };
  });
});
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem v-for="(item, index) in formattedBreadcrumbs" :key="index">
        <BreadcrumbLink
            v-if="!item.disabled"
            :href="item.href"
            :class="{ 'text-muted-foreground': !item.disabled }"
        >
          {{ item.title }}
        </BreadcrumbLink>
        <BreadcrumbPage v-else>
          {{ item.title }}
        </BreadcrumbPage>
        <BreadcrumbSeparator v-if="index < formattedBreadcrumbs.length - 1"/>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>