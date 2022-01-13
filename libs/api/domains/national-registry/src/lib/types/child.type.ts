export interface FamilyChild {
  nationalId: string // Barn
  fullName: string // FulltNafn
  displayName?: string // BirtNafn
  middleName?: string // Millinafn
  surname?: string // Kenninafn
  gender?: string // Kyn
  genderDisplay?: string // Kynheiti
  birthday?: string // Faedingardagur
  parent1?: string // Foreldri1
  nameParent1?: string // NafnForeldri1
  parent2?: string // Foreldri2
  nameParent2?: string // NafnForeldri2
  custody1?: string // Forsja1
  nameCustody1?: string // NafnForsja1
  custodyText1?: string // Forsjatxt1
  custody2?: string // Forsja2
  nameCustody2?: string // NafnForsja2
  custodyText2?: string // Forsjatxt2
  birthplace?: string // Faedingarstadur
  religion?: string // Trufelag
  nationality?: string // Rikisfang
  homeAddress?: string // Logheimili
  municipality?: string // Sveitarfelag
  postal?: string // Postaritun
}
