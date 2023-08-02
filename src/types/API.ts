export enum AlertTypes {
  SUBIK = "subik",
  RESUBIK = "resubik",
  BITSY = "bitsy",
  RAJDZIK = "rajdzik",
  SUB_GIFCIK = "sub_gifcik",
  FOLOWEK = "folowek",
}

export enum Entitsy {
  MARSHALL = "MARSHALL",
  PAPIEŻKOPTER = "PAPIEŻKOPTER",
  MAŁYSZ = "MAŁYSZ",
  KUBICA = "KUBICA",
  TESTO = "TESTO",
  MARIUSZ = "MARIUSZ",
  PREZENTKONON = "PREZENTKONON",
}

export type AlertInfo = {
  type: AlertTypes;
  innerHtml: string;
  duration: number;
  entities: Entitsy[];
};
