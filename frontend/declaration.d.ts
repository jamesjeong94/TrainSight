declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module 'google-map-react';

declare module '*.png' {
  const value: any;
  export = value;
}
