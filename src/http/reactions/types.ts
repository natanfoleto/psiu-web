export enum EnumTypeReaction {
  APOIO,
  ENTENDO_VOCE,
  FORCA,
  TRISTEZA,
  ESTAMOS_JUNTOS,
}

export interface IReactionPost {
  id: string
  type: EnumTypeReaction
  reactedAt: string
}

export interface IReactionComment {
  id: string
  postId: string
  type: EnumTypeReaction
  reactedAt: string
}
