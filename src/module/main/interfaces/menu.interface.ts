


export interface Menu {
  id: string;
  name: string;
  path?: string;
  subpath: Children[]
}

export interface Children {
  id: string;
  name: string;
  path: string
  children: Children[]
}
