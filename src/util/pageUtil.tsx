import { scroller, animateScroll } from "react-scroll";
import { scrollerArgs } from "./constants";
import { HOME_SCENE_DURATION } from "pages/Home";
import { theme } from "./styles";
import { PROJECT_SCENE_DURATION } from "pages/projects/Project";

export const PAGES = [
  'home',
  'venga',
  'googleTVM',
  'virion',
  'clog',
];

// Note: Must be a 6-digit Hex! For mixing.
export const PAGE_COLORS = [
  null,
  theme.orange,
  '#813A53',
  '#870308',
  '#000000',
];

export function getPageIx(currPage: string): number {
  return PAGES.indexOf(currPage);
}

export function getNextPageIx(currPage: string): number {
  if (isLastPage(currPage)) {
    return null;
  }
  return PAGES.indexOf(currPage) + 1;
}

export function getPreviousPageIx(currPage: string): number {
  return PAGES.indexOf(currPage) - 1;
}

export function getPreviousPage(currPage: string): string {
  return PAGES[getPreviousPageIx(currPage)];
}

export function getNextPage(currPage: string): string {
  return PAGES[getNextPageIx(currPage)];
}

export function isLastPage(page: string): boolean {
  return PAGES.indexOf(page) === (PAGES.length - 1);
}

export function doScroll(page: string, offset?: number) {
  if (page === 'home') scrollToHome();
  else {
    scroller.scrollTo(page, {
      ...scrollerArgs,
      offset: offset ?? undefined,
    });
  }
}

export function scrollToHome() {
  scroller.scrollTo('home', {
    ...scrollerArgs,
    offset: -HOME_SCENE_DURATION,
  });
}

export function scrollDownOnePage() {
  if (window) {
    animateScroll.scrollMore(window.innerHeight, {
      ...scrollerArgs,
      horizontal: false,
      containerId: 'ProjectContainer',
    });
  }
}

export function scrollUpOnePage() {
  if (window) {
    animateScroll.scrollMore(-window.innerHeight, {
      ...scrollerArgs,
      horizontal: false,
      containerId: 'ProjectContainer',
    });
  }
}
