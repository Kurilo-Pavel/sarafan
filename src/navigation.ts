import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const locales = ['en', 'ru', "pl"];
export const localePrefix = 'always';

export const pathnames = {
  "/": {
    en: "/",
    ru: "/",
    pl: "/"
  },

  // '/admin': {
  //   en: '/admin',
  //   ru: '/admin'
  // },
}

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});