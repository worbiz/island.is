import {
  CaseAppealDecision,
  CaseCustodyProvisions,
  CaseCustodyRestrictions,
  CaseDecision,
  CaseGender,
} from '@island.is/judicial-system/types'
import {
  formatConclusion,
  formatCourtCaseNumber,
  formatProsecutorCourtDateEmailNotification,
  formatCourtDateNotificationCondition,
  formatCustodyProvisions,
  formatHeadsUpSmsNotification,
  formatProsecutorDemands,
  formatReadyForCourtSmsNotification,
  formatPrisonCourtDateEmailNotification,
  stripHtmlTags,
  formatDefenderCourtDateEmailNotification,
  formatPrisonRulingEmailNotification,
} from './formatters'

describe('formatProsecutorDemands', () => {
  test('should format prosecutor demands with isolation', () => {
    // Arrange
    const accusedNationalId = '010101-0000'
    const accusedName = 'Glanni Glæpur'
    const court = 'Héraðsdómur Reykjavíkur'
    const alternativeTravelBan = false
    const requestedCustodyEndDate = new Date('2020-11-16T19:30:08.000Z')
    const isolation = true
    const isExtension = false

    // Act
    const res = formatProsecutorDemands(
      accusedNationalId,
      accusedName,
      court,
      alternativeTravelBan,
      requestedCustodyEndDate,
      isolation,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Þess er krafist að Glanni Glæpur, kt. 010101-0000, sæti gæsluvarðhaldi með úrskurði Héraðsdóms Reykjavíkur, til mánudagsins 16. nóvember 2020, kl. 19:30, og verði gert að sæta einangrun á meðan á varðhaldi stendur.',
    )
  })

  test('should format prosecutor demands without isolation', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const court = 'Héraðsdómur Reykjavíkur'
    const alternativeTravelBan = false
    const requestedCustodyEndDate = new Date('2020-11-16T19:30:08.000Z')
    const isolation = false
    const isExtension = false

    // Act
    const res = formatProsecutorDemands(
      accusedNationalId,
      accusedName,
      court,
      alternativeTravelBan,
      requestedCustodyEndDate,
      isolation,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Þess er krafist að Glanni Glæpur, kt. 010101-0000, sæti gæsluvarðhaldi með úrskurði Héraðsdóms Reykjavíkur, til mánudagsins 16. nóvember 2020, kl. 19:30.',
    )
  })

  test('should format prosecutor demands with alternative travel ban', () => {
    // Arrange
    const accusedNationalId = '010101-0000'
    const accusedName = 'Glanni Glæpur'
    const court = 'Héraðsdómur Reykjavíkur'
    const alternativeTravelBan = true
    const requestedCustodyEndDate = new Date('2020-11-16T19:30:08.000Z')
    const isolation = true
    const isExtension = false

    // Act
    const res = formatProsecutorDemands(
      accusedNationalId,
      accusedName,
      court,
      alternativeTravelBan,
      requestedCustodyEndDate,
      isolation,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Þess er krafist að Glanni Glæpur, kt. 010101-0000, sæti gæsluvarðhaldi, farbanni til vara, með úrskurði Héraðsdóms Reykjavíkur, til mánudagsins 16. nóvember 2020, kl. 19:30, og verði gert að sæta einangrun á meðan á varðhaldi stendur.',
    )
  })

  test('should format extended prosecutor demands', () => {
    // Arrange
    const accusedNationalId = '011101-0000'
    const accusedName = 'Siggi Sýra'
    const court = 'Héraðsdómur Kjósarskarðs'
    const alternativeTravelBan = false
    const requestedCustodyEndDate = new Date('2020-11-16T19:30:08.000Z')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING

    // Act
    const res = formatProsecutorDemands(
      accusedNationalId,
      accusedName,
      court,
      alternativeTravelBan,
      requestedCustodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Þess er krafist að Siggi Sýra, kt. 011101-0000, sæti áframhaldandi gæsluvarðhaldi með úrskurði Héraðsdóms Kjósarskarðs, til mánudagsins 16. nóvember 2020, kl. 19:30.',
    )
  })

  test('should format extended prosecutor demands when alternative travel ban requested', () => {
    // Arrange
    const accusedNationalId = '011101-0000'
    const accusedName = 'Siggi Sýra'
    const court = 'Héraðsdómur Kjósarskarðs'
    const alternativeTravelBan = true
    const requestedCustodyEndDate = new Date('2020-11-16T19:30:08.000Z')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING

    // Act
    const res = formatProsecutorDemands(
      accusedNationalId,
      accusedName,
      court,
      alternativeTravelBan,
      requestedCustodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Þess er krafist að Siggi Sýra, kt. 011101-0000, sæti áframhaldandi gæsluvarðhaldi, farbanni til vara, með úrskurði Héraðsdóms Kjósarskarðs, til mánudagsins 16. nóvember 2020, kl. 19:30.',
    )
  })

  test('should format extended prosecutor demands when previous travel ban', () => {
    // Arrange
    const accusedNationalId = '011101-0000'
    const accusedName = 'Siggi Sýra'
    const court = 'Héraðsdómur Kjósarskarðs'
    const alternativeTravelBan = false
    const requestedCustodyEndDate = new Date('2020-11-16T19:30:08.000Z')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN

    // Act
    const res = formatProsecutorDemands(
      accusedNationalId,
      accusedName,
      court,
      alternativeTravelBan,
      requestedCustodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Þess er krafist að Siggi Sýra, kt. 011101-0000, sæti gæsluvarðhaldi með úrskurði Héraðsdóms Kjósarskarðs, til mánudagsins 16. nóvember 2020, kl. 19:30.',
    )
  })

  test('should format extended prosecutor demands when previous travel ban and alternative travel ban requested', () => {
    // Arrange
    const accusedNationalId = '011101-0000'
    const accusedName = 'Siggi Sýra'
    const court = 'Héraðsdómur Kjósarskarðs'
    const alternativeTravelBan = true
    const requestedCustodyEndDate = new Date('2020-11-16T19:30:08.000Z')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN

    // Act
    const res = formatProsecutorDemands(
      accusedNationalId,
      accusedName,
      court,
      alternativeTravelBan,
      requestedCustodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Þess er krafist að Siggi Sýra, kt. 011101-0000, sæti gæsluvarðhaldi, áframhaldandi farbanni til vara, með úrskurði Héraðsdóms Kjósarskarðs, til mánudagsins 16. nóvember 2020, kl. 19:30.',
    )
  })
})

describe('formatCustodyProvisions', () => {
  test('should format custody provisions when no provisions are selected', () => {
    // Arrange
    const custodyProvisions = []

    // Act
    const res = formatCustodyProvisions(custodyProvisions)

    // Assert
    expect(res).toBe('')
  })

  test('should format custody provisions when some provisions are selected', () => {
    // Arrange
    const custodyProvisions = [
      CaseCustodyProvisions._95_1_A,
      CaseCustodyProvisions._95_1_B,
      CaseCustodyProvisions._95_1_C,
      CaseCustodyProvisions._95_1_D,
      CaseCustodyProvisions._95_2,
      CaseCustodyProvisions._99_1_B,
      CaseCustodyProvisions._100_1,
    ]

    // Act
    const res = formatCustodyProvisions(custodyProvisions)

    // Assert
    expect(res).toBe(
      'a-lið 1. mgr. 95. gr.\nb-lið 1. mgr. 95. gr.\nc-lið 1. mgr. 95. gr.\nd-lið 1. mgr. 95. gr.\n2. mgr. 95. gr.\nb-lið 1. mgr. 99. gr.\n1. mgr. 100. gr. sml.',
    )
  })

  test('should sort provisions when formatting custody provisions', () => {
    // Arrange
    const custodyProvisions = [
      CaseCustodyProvisions._95_1_C,
      CaseCustodyProvisions._95_1_D,
      CaseCustodyProvisions._95_1_A,
      CaseCustodyProvisions._95_2,
      CaseCustodyProvisions._99_1_B,
      CaseCustodyProvisions._95_1_B,
      CaseCustodyProvisions._100_1,
    ]

    // Act
    const res = formatCustodyProvisions(custodyProvisions)

    // Assert
    expect(res).toBe(
      'a-lið 1. mgr. 95. gr.\nb-lið 1. mgr. 95. gr.\nc-lið 1. mgr. 95. gr.\nd-lið 1. mgr. 95. gr.\n2. mgr. 95. gr.\nb-lið 1. mgr. 99. gr.\n1. mgr. 100. gr. sml.',
    )
  })
})

describe('formatCourtCaseNumber', () => {
  test('should return formatted court case number', () => {
    // Arrange
    const court = 'Héraðsdómur Reykjavíkur'
    const courtCaseNumber = 'R-5/2020'

    // Act
    const res = formatCourtCaseNumber(court, courtCaseNumber)

    // Assert
    expect(res).toBe('Málsnúmer Héraðsdóms Reykjavíkur R-5/2020')
  })
})

describe('formatConclusion', () => {
  test('should format conclusion for a rejected case', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.REJECTING
    const isolation = false
    const isExtension = false

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      undefined,
      isolation,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Kröfu um að kærði, Glanni Glæpur, kt. 010101-0000, sæti gæsluvarðhaldi er hafnað.',
    )
  })

  test('should format conclusion for an accepted case without isolation', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.ACCEPTING
    const custodyEndDate = new Date('2020-12-22T11:23')
    const isolation = false
    const isExtension = false

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      custodyEndDate,
      isolation,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Kærði, Glanni Glæpur, kt. 010101-0000, skal sæta gæsluvarðhaldi, þó ekki lengur en til þriðjudagsins 22. desember 2020, kl. 11:23.',
    )
  })

  test('should format conclusion for an accepted case with isolation', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.ACCEPTING
    const custodyEndDate = new Date('2020-12-22T11:23')
    const isolation = true
    const isExtension = false

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      custodyEndDate,
      isolation,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Kærði, Glanni Glæpur, kt. 010101-0000, skal sæta gæsluvarðhaldi, þó ekki lengur en til þriðjudagsins 22. desember 2020, kl. 11:23. Kærði skal sæta einangrun á meðan á gæsluvarðhaldinu stendur.',
    )
  })

  test('should format conclusion for a case where custody is rejected, but alternative travel ban accepted', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN
    const custodyEndDate = new Date('2021-01-29T13:03')
    const isolation = false
    const isExtension = false

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      custodyEndDate,
      isolation,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Kærði, Glanni Glæpur, kt. 010101-0000, skal sæta farbanni, þó ekki lengur en til föstudagsins 29. janúar 2021, kl. 13:03.',
    )
  })

  test('should format conclusion for rejected extension', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.REJECTING
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      undefined,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Kröfu um að kærði, Glanni Glæpur, kt. 010101-0000, sæti áframhaldandi gæsluvarðhaldi er hafnað.',
    )
  })

  test('should format conclusion for rejected extension when previous ruling was travel ban', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.REJECTING
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      undefined,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Kröfu um að kærði, Glanni Glæpur, kt. 010101-0000, sæti gæsluvarðhaldi er hafnað.',
    )
  })

  test('should format conclusion for accepted extension', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.ACCEPTING
    const custodyEndDate = new Date('2020-12-22T11:23')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      custodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Kærði, Glanni Glæpur, kt. 010101-0000, skal sæta áframhaldandi gæsluvarðhaldi, þó ekki lengur en til þriðjudagsins 22. desember 2020, kl. 11:23.',
    )
  })

  test('should format conclusion for accepted extension when previous ruling was travel ban', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.ACCEPTING
    const custodyEndDate = new Date('2020-12-22T11:23')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      custodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Kærði, Glanni Glæpur, kt. 010101-0000, skal sæta gæsluvarðhaldi, þó ekki lengur en til þriðjudagsins 22. desember 2020, kl. 11:23.',
    )
  })

  test('should format conclusion for rejected extension when alternative travel ban accepted', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN
    const custodyEndDate = new Date('2020-12-22T11:23')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      custodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Kærði, Glanni Glæpur, kt. 010101-0000, skal sæta farbanni, þó ekki lengur en til þriðjudagsins 22. desember 2020, kl. 11:23.',
    )
  })

  test('should format conclusion for rejected extension when alternative travel ban accepted and previous ruling was travel ban', () => {
    // Arrange
    const accusedNationalId = '0101010000'
    const accusedName = 'Glanni Glæpur'
    const accusedGender = CaseGender.MALE
    const decision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN
    const custodyEndDate = new Date('2020-12-22T11:23')
    const isolation = false
    const isExtension = true
    const previousDecision = CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN

    // Act
    const res = formatConclusion(
      accusedNationalId,
      accusedName,
      accusedGender,
      decision,
      custodyEndDate,
      isolation,
      isExtension,
      previousDecision,
    )

    // Assert
    expect(res).toBe(
      'Kærði, Glanni Glæpur, kt. 010101-0000, skal sæta áframhaldandi farbanni, þó ekki lengur en til þriðjudagsins 22. desember 2020, kl. 11:23.',
    )
  })
})

describe('formatHeadsUpSmsNotification', () => {
  test('should format heads up notification', () => {
    // Arrange
    const prosecutorName = 'Árni Ákærandi'
    const arrestDate = new Date('2020-11-24T13:22')
    const requestedCourtDate = new Date('2020-11-25T09:15')

    // Act
    const res = formatHeadsUpSmsNotification(
      prosecutorName,
      arrestDate,
      requestedCourtDate,
    )

    // Assert
    expect(res).toBe(
      'Ný gæsluvarðhaldskrafa í vinnslu. Ákærandi: Árni Ákærandi. Viðkomandi handtekinn 24.11.2020, kl. 13:22. ÓE fyrirtöku 25.11.2020 eftir kl. 09:15.',
    )
  })

  test('should format heads up notification with missing dates', () => {
    // Arrange
    const prosecutorName = 'Árni Ákærandi'

    // Act
    const res = formatHeadsUpSmsNotification(
      prosecutorName,
      undefined,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Ný gæsluvarðhaldskrafa í vinnslu. Ákærandi: Árni Ákærandi.',
    )
  })
})

describe('formatReadyForCourtSmsNotification', () => {
  test('should format ready for court SMS notification', () => {
    // Arrange
    const prosecutorName = 'Árni Ákærandi'
    const court = 'Héraðsdómur Reykjavíkur'

    // Act
    const res = formatReadyForCourtSmsNotification(prosecutorName, court)

    // Assert
    expect(res).toBe(
      'Gæsluvarðhaldskrafa tilbúin til afgreiðslu. Ákærandi: Árni Ákærandi. Dómstóll: Héraðsdómur Reykjavíkur.',
    )
  })
})

describe('formatProsecutorCourtDateEmailNotification', () => {
  test('should format court date notification', () => {
    // Arrange
    const court = 'Héraðsdómur Reykjavíkur'
    const courtDate = new Date('2020-12-24T18:00')
    const courtRoom = '101'
    const defenderName = 'Valdi Verjandi'

    // Act
    const res = formatProsecutorCourtDateEmailNotification(
      court,
      courtDate,
      courtRoom,
      defenderName,
    )

    // Assert
    expect(res).toBe(
      'Héraðsdómur Reykjavíkur hefur staðfest fyrirtökutíma fyrir gæsluvarðhaldskröfu.<br /><br />Fyrirtaka mun fara fram 24. desember 2020, kl. 18:00.<br /><br />Dómsalur: 101.<br /><br />Verjandi sakbornings: Valdi Verjandi.',
    )
  })

  test('should format court date notification with no defender', () => {
    // Arrange
    const court = 'Héraðsdómur Reykjavíkur'
    const courtDate = new Date('2020-12-24T18:00')
    const courtRoom = '101'

    // Act
    const res = formatProsecutorCourtDateEmailNotification(
      court,
      courtDate,
      courtRoom,
      undefined,
    )

    // Assert
    expect(res).toBe(
      'Héraðsdómur Reykjavíkur hefur staðfest fyrirtökutíma fyrir gæsluvarðhaldskröfu.<br /><br />Fyrirtaka mun fara fram 24. desember 2020, kl. 18:00.<br /><br />Dómsalur: 101.<br /><br />Verjandi sakbornings hefur ekki verið skráður.',
    )
  })
})

describe('formatPrisonCourtDateEmailNotification', () => {
  test('should format court date notification', () => {
    // Arrange
    const prosecutorOffice = 'Lögreglustjórinn á höfuðborgarsvæðinu'
    const court = 'Héraðsdómur Austurlands'
    const courtDate = new Date('2021-02-04T02:02')
    const accusedName = 'Maggi Murder'
    const accusedGender = CaseGender.FEMALE
    const requestedCustodyEndDate = new Date('2030-08-12T08:25')
    const isolation = true
    const defenderName = 'Varði Varnari'
    const isExtension = false

    // Act
    const res = formatPrisonCourtDateEmailNotification(
      prosecutorOffice,
      court,
      courtDate,
      accusedName,
      accusedGender,
      requestedCustodyEndDate,
      isolation,
      defenderName,
      isExtension,
    )

    // Assert
    expect(res).toBe(
      'Lögreglustjórinn á höfuðborgarsvæðinu hefur sent kröfu um gæsluvarðhald til Héraðsdóms Austurlands og verður málið tekið fyrir fimmtudaginn, 4. febrúar 2021, kl. 02:02.<br /><br />Nafn sakbornings: Maggi Murder<br /><br />Kyn sakbornings: Kona<br /><br />Krafist er gæsluvarðhalds til mánudagsins, 12. ágúst 2030, kl. 08:25.<br /><br />Farið er fram á einangrun.<br /><br />Verjandi sakbornings: Varði Varnari.',
    )
  })

  test('should format court date notification with unknown gender', () => {
    // Arrange
    const prosecutorOffice = 'Lögreglustjórinn á höfuðborgarsvæðinu'
    const court = 'Héraðsdómur Austurlands'
    const courtDate = new Date('2021-02-04T02:02')
    const accusedName = 'Maggi Murder'
    const accusedGender = CaseGender.OTHER
    const requestedCustodyEndDate = new Date('2030-08-12T08:25')
    const isolation = true
    const defenderName = 'Vala Verja'
    const isExtension = false

    // Act
    const res = formatPrisonCourtDateEmailNotification(
      prosecutorOffice,
      court,
      courtDate,
      accusedName,
      accusedGender,
      requestedCustodyEndDate,
      isolation,
      defenderName,
      isExtension,
    )

    // Assert
    expect(res).toBe(
      'Lögreglustjórinn á höfuðborgarsvæðinu hefur sent kröfu um gæsluvarðhald til Héraðsdóms Austurlands og verður málið tekið fyrir fimmtudaginn, 4. febrúar 2021, kl. 02:02.<br /><br />Nafn sakbornings: Maggi Murder<br /><br />Kyn sakbornings: Kynsegin/Annað<br /><br />Krafist er gæsluvarðhalds til mánudagsins, 12. ágúst 2030, kl. 08:25.<br /><br />Farið er fram á einangrun.<br /><br />Verjandi sakbornings: Vala Verja.',
    )
  })

  test('should format court date notification with no isolation', () => {
    // Arrange
    const prosecutorOffice = 'Lögreglustjórinn á höfuðborgarsvæðinu'
    const court = 'Héraðsdómur Austurlands'
    const courtDate = new Date('2021-02-04T02:02')
    const accusedName = 'Maggi Murder'
    const accusedGender = CaseGender.MALE
    const requestedCustodyEndDate = new Date('2030-08-12T08:25')
    const isolation = false
    const defenderName = 'Vala Verja'
    const isExtension = false

    // Act
    const res = formatPrisonCourtDateEmailNotification(
      prosecutorOffice,
      court,
      courtDate,
      accusedName,
      accusedGender,
      requestedCustodyEndDate,
      isolation,
      defenderName,
      isExtension,
    )

    // Assert
    expect(res).toBe(
      'Lögreglustjórinn á höfuðborgarsvæðinu hefur sent kröfu um gæsluvarðhald til Héraðsdóms Austurlands og verður málið tekið fyrir fimmtudaginn, 4. febrúar 2021, kl. 02:02.<br /><br />Nafn sakbornings: Maggi Murder<br /><br />Kyn sakbornings: Karl<br /><br />Krafist er gæsluvarðhalds til mánudagsins, 12. ágúst 2030, kl. 08:25.<br /><br />Ekki er farið fram á einangrun.<br /><br />Verjandi sakbornings: Vala Verja.',
    )
  })

  test('should format court date notification with no defender', () => {
    // Arrange
    const prosecutorOffice = 'Lögreglustjórinn á höfuðborgarsvæðinu'
    const court = 'Héraðsdómur Austurlands'
    const courtDate = new Date('2021-02-04T02:02')
    const accusedName = 'Maggi Murder'
    const accusedGender = CaseGender.MALE
    const requestedCustodyEndDate = new Date('2030-08-12T08:25')
    const isolation = false
    const isExtension = false

    // Act
    const res = formatPrisonCourtDateEmailNotification(
      prosecutorOffice,
      court,
      courtDate,
      accusedName,
      accusedGender,
      requestedCustodyEndDate,
      isolation,
      undefined,
      isExtension,
    )

    // Assert
    expect(res).toBe(
      'Lögreglustjórinn á höfuðborgarsvæðinu hefur sent kröfu um gæsluvarðhald til Héraðsdóms Austurlands og verður málið tekið fyrir fimmtudaginn, 4. febrúar 2021, kl. 02:02.<br /><br />Nafn sakbornings: Maggi Murder<br /><br />Kyn sakbornings: Karl<br /><br />Krafist er gæsluvarðhalds til mánudagsins, 12. ágúst 2030, kl. 08:25.<br /><br />Ekki er farið fram á einangrun.<br /><br />Verjandi sakbornings hefur ekki verið skráður.',
    )
  })

  test('should format court date notification for extension requests', () => {
    // Arrange
    const prosecutorOffice = 'Lögreglustjórinn á höfuðborgarsvæðinu'
    const court = 'Héraðsdómur Austurlands'
    const courtDate = new Date('2021-02-11T12:02')
    const accusedName = 'Maggi Murder'
    const accusedGender = CaseGender.MALE
    const requestedCustodyEndDate = new Date('2030-08-12T08:25')
    const isolation = false
    const defenderName = 'Vala Verja'
    const isExtension = true

    // Act
    const res = formatPrisonCourtDateEmailNotification(
      prosecutorOffice,
      court,
      courtDate,
      accusedName,
      accusedGender,
      requestedCustodyEndDate,
      isolation,
      defenderName,
      isExtension,
    )

    // Assert
    expect(res).toBe(
      'Lögreglustjórinn á höfuðborgarsvæðinu hefur sent kröfu um áframhaldandi gæsluvarðhald til Héraðsdóms Austurlands og verður málið tekið fyrir fimmtudaginn, 11. febrúar 2021, kl. 12:02.<br /><br />Nafn sakbornings: Maggi Murder<br /><br />Kyn sakbornings: Karl<br /><br />Krafist er gæsluvarðhalds til mánudagsins, 12. ágúst 2030, kl. 08:25.<br /><br />Ekki er farið fram á einangrun.<br /><br />Verjandi sakbornings: Vala Verja.',
    )
  })
})

describe('formatDefenderCourtDateEmailNotification', () => {
  test('should format defender court date notification', () => {
    // Arrange
    const accusedNationalId = '1212129999'
    const accusedName = 'Robbi Ræningi'
    const court = 'Héraðsdómur Norðurlands'
    const courtDate = new Date('2020-12-19T10:19')
    const courtRoom = '101'

    // Act
    const res = formatDefenderCourtDateEmailNotification(
      accusedNationalId,
      accusedName,
      court,
      courtDate,
      courtRoom,
    )

    // Assert
    expect(res).toBe(
      'Héraðsdómur Norðurlands hefur staðfest fyrirtökutíma fyrir gæsluvarðhaldskröfu.<br /><br />Fyrirtaka mun fara fram laugardaginn, 19. desember 2020, kl. 10:19.<br /><br />Dómsalur: 101.<br /><br />Sakborningur: Robbi Ræningi 121212-9999.<br /><br />Dómstóllinn hefur skráð þig sem verjanda sakbornings.',
    )
  })
})

describe('formatCourtDateNotificationCondition', () => {
  test('should format prison court date notification', () => {
    // Arrange
    const courtDate = new Date('2020-12-20T13:32')
    const defenderEmail = 'defender@defenders.is'

    // Act
    const res = formatCourtDateNotificationCondition(courtDate, defenderEmail)

    // Assert
    expect(res).toBe(
      'courtDate=20.12.2020 13:32,defenderEmail=defender@defenders.is',
    )
  })
})

describe('formatPrisonRulingEmailNotification', () => {
  test('should format prison ruling notification', () => {
    // Arrange
    const accusedNationalId = '2411018760'
    const accusedName = 'Biggi Börgler'
    const accusedGender = CaseGender.MALE
    const court = 'Héraðsdómur Vesturlands'
    const prosecutorName = 'Siggi Sakó'
    const courtDate = new Date('2020-12-20T13:32')
    const defenderName = 'Skúli Skjöldur'
    const decision = CaseDecision.ACCEPTING
    const custodyEndDate = new Date('2021-04-06T12:30')
    const custodyRestrictions = [
      CaseCustodyRestrictions.ISOLATION,
      CaseCustodyRestrictions.MEDIA,
    ]
    const accusedAppealDecision = CaseAppealDecision.APPEAL
    const prosecutorAppealDecision = CaseAppealDecision.ACCEPT
    const judgeName = 'Dalli Dómari'
    const judgeTitle = 'aðal dómarinn'
    const isExtension = false

    // Act
    const res = formatPrisonRulingEmailNotification(
      accusedNationalId,
      accusedName,
      accusedGender,
      court,
      prosecutorName,
      courtDate,
      defenderName,
      decision,
      custodyEndDate,
      custodyRestrictions,
      accusedAppealDecision,
      prosecutorAppealDecision,
      judgeName,
      judgeTitle,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      '<strong>Úrskurður um gæsluvarðhald</strong><br /><br />Héraðsdómur Vesturlands, 20. desember 2020.<br /><br />Ákærandi: Siggi Sakó<br />Verjandi: Skúli Skjöldur<br /><br /><strong>Úrskurðarorð</strong><br /><br />Kærði, Biggi Börgler, kt. 241101-8760, skal sæta gæsluvarðhaldi, þó ekki lengur en til þriðjudagsins 6. apríl 2021, kl. 12:30. Kærði skal sæta einangrun á meðan á gæsluvarðhaldinu stendur.<br /><br /><strong>Ákvörðun um kæru</strong><br />Kærði kærir úrskurðinn.<br />Sækjandi unir úrskurðinum.<br /><br /><strong>Tilhögun gæsluvarðhalds</strong><br />Sækjandi tekur fram að kærði skuli sæta einangrun á meðan á gæsluvarðhaldinu stendur og að gæsluvarðhaldið verði með fjölmiðlabanni skv. 99. gr. laga nr. 88/2008.<br /><br />Dalli Dómari aðal dómarinn',
    )
  })

  test('should format prison ruling notification for a rejected case', () => {
    // Arrange
    const accusedNationalId = '2411018760'
    const accusedName = 'Biggi Börgler'
    const accusedGender = CaseGender.MALE
    const court = 'Héraðsdómur Vesturlands'
    const prosecutorName = 'Siggi Sakó'
    const courtDate = new Date('2020-12-20T13:32')
    const defenderName = 'Skúli Skjöldur'
    const decision = CaseDecision.REJECTING
    const custodyEndDate = new Date('2021-04-06T12:30')
    const custodyRestrictions = [
      CaseCustodyRestrictions.ISOLATION,
      CaseCustodyRestrictions.MEDIA,
    ]
    const accusedAppealDecision = CaseAppealDecision.APPEAL
    const prosecutorAppealDecision = CaseAppealDecision.ACCEPT
    const judgeName = 'Dalli Dómari'
    const judgeTitle = 'aðal dómarinn'
    const isExtension = false

    // Act
    const res = formatPrisonRulingEmailNotification(
      accusedNationalId,
      accusedName,
      accusedGender,
      court,
      prosecutorName,
      courtDate,
      defenderName,
      decision,
      custodyEndDate,
      custodyRestrictions,
      accusedAppealDecision,
      prosecutorAppealDecision,
      judgeName,
      judgeTitle,
      isExtension,
      undefined,
    )

    // Assert
    expect(res).toBe(
      '<strong>Úrskurður um gæsluvarðhald</strong><br /><br />Héraðsdómur Vesturlands, 20. desember 2020.<br /><br />Ákærandi: Siggi Sakó<br />Verjandi: Skúli Skjöldur<br /><br /><strong>Úrskurðarorð</strong><br /><br />Kröfu um að kærði, Biggi Börgler, kt. 241101-8760, sæti gæsluvarðhaldi er hafnað.<br /><br /><strong>Ákvörðun um kæru</strong><br />Kærði kærir úrskurðinn.<br />Sækjandi unir úrskurðinum.<br /><br />Dalli Dómari aðal dómarinn',
    )
  })
})

describe('stripHtmlTags', () => {
  test('should format court date notification condition', () => {
    // Arrange
    const html = 'bla<strong>blab</strong>la<br /><br />blabla'

    // Act
    const res = stripHtmlTags(html)

    // Assert
    expect(res).toBe('blablabla\n\nblabla')
  })
})
