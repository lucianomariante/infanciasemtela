import { getAllPages, type ContentPage, type PageType } from "@/lib/content";
import { getPagePath } from "@/lib/schema";

export type InternalLinkItem = {
  slug: string;
  title: string;
  type: PageType;
  url: string;
};

const STOP_WORDS = new Set([
  "a",
  "ao",
  "aos",
  "com",
  "da",
  "de",
  "do",
  "e",
  "em",
  "o",
  "os",
  "para",
  "por",
  "sem",
]);

function slugToWords(slug: string): Set<string> {
  return new Set(
    slug
      .split("-")
      .map((word) => word.trim().toLocaleLowerCase("pt-BR"))
      .filter((word) => word.length > 1 && !STOP_WORDS.has(word)),
  );
}

function getSimilarityScore(currentPage: ContentPage, candidate: ContentPage) {
  const currentWords = slugToWords(currentPage.slug);
  const candidateWords = slugToWords(candidate.slug);
  let score = 0;

  for (const word of candidateWords) {
    if (currentWords.has(word)) {
      score += word === "anos" || /^\d+$/.test(word) ? 2 : 1;
    }
  }

  if (currentPage.type === "guide" && candidate.type === "bestof") {
    score += 3;
  }

  if (currentPage.type === "bestof" && candidate.type === "guide") {
    score += 3;
  }

  return score;
}

function toInternalLink(page: ContentPage): InternalLinkItem {
  return {
    slug: page.slug,
    title: page.title,
    type: page.type,
    url: getPagePath(page),
  };
}

export function getSuggestedInternalLinks(
  currentPage: ContentPage,
): InternalLinkItem[] {
  const pages = getAllPages().filter((page) => page.slug !== currentPage.slug);

  const rankedPages = pages
    .map((page) => ({
      page,
      score: getSimilarityScore(currentPage, page),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.page.title.localeCompare(right.page.title, "pt-BR");
    });

  const selectedPages: ContentPage[] = [];

  if (currentPage.type === "guide") {
    const bestofPage = rankedPages.find((item) => item.page.type === "bestof");

    if (bestofPage) {
      selectedPages.push(bestofPage.page);
    }
  }

  for (const item of rankedPages) {
    if (selectedPages.length >= 5) {
      break;
    }

    if (selectedPages.some((page) => page.slug === item.page.slug)) {
      continue;
    }

    selectedPages.push(item.page);
  }

  return selectedPages.slice(0, 5).map(toInternalLink);
}

export function getManualInternalLinks(
  currentPage: ContentPage,
): InternalLinkItem[] {
  const pagesByUrl = new Map(
    getAllPages().map((page) => [getPagePath(page), page]),
  );

  return currentPage.internal_links
    .filter((url) => url !== getPagePath(currentPage))
    .map((url) => {
      const linkedPage = pagesByUrl.get(url);

      if (linkedPage) {
        return toInternalLink(linkedPage);
      }

      const slug = url.split("/").filter(Boolean).at(-1) ?? url;

      return {
        slug,
        title: slug.replaceAll("-", " "),
        type: currentPage.type,
        url,
      };
    });
}

export function getCombinedInternalLinks(
  currentPage: ContentPage,
): InternalLinkItem[] {
  const links = [
    ...getManualInternalLinks(currentPage),
    ...getSuggestedInternalLinks(currentPage),
  ];
  const seenUrls = new Set<string>();

  return links
    .filter((link) => {
      if (seenUrls.has(link.url) || link.url === getPagePath(currentPage)) {
        return false;
      }

      seenUrls.add(link.url);
      return true;
    })
    .slice(0, 5);
}
