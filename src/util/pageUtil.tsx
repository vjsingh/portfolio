import { scroller, animateScroll } from "react-scroll";
import { scrollerArgs } from "./constants";
import { HOME_SCENE_DURATION } from "pages/Home";

export const PAGES = [
  'home',
  'venga',
  'googleTVM',
];

export function getNextPageIx(currPage: string): number {
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

export function doScroll(page: string) {
  if (page === 'home') scrollToHome();
  else {
    scroller.scrollTo(page, {
      ...scrollerArgs,
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
