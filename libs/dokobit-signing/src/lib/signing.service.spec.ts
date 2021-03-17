import { Base64 } from 'js-base64'
import { createHash } from 'crypto'

import { Test, TestingModule } from '@nestjs/testing'

import { LoggingModule } from '@island.is/logging'

import { SigningModule } from './signing.module'
import { SigningService } from './signing.service'

const testOptions = {
  url: 'Test Url',
  accessToken: 'Test Access Token',
}
const testMobileNumber = '1111111'
const testMessage = 'Test Message'
const testContact = 'Test Contact'
const testLocation = 'Test Location'
const testDocumentName = 'Test Document Name'
const testDocumentContent = 'Test Document Content'

const testSignUrl = `${testOptions.url}/mobile/sign.json?access_token=${testOptions.accessToken}`
const testSignResponse = {
  status: 'ok',
  control_code: 'Test Control Code',
  token: 'Test Document Token',
}

const testStatusUrl = `${testOptions.url}/mobile/sign/status/${testSignResponse.token}.json?access_token=${testOptions.accessToken}`
const testSignedDocumentContent = 'Test Signed Document Content'
const testStatusResponse = {
  status: 'ok',
  file: {
    name: testDocumentName,
    digest: createHash('sha1')
      .update(testSignedDocumentContent, 'ascii')
      .digest('hex'),
    content: Base64.btoa(testSignedDocumentContent),
  },
}

jest.mock('form-data', function () {
  return {
    default: function () {
      this.append = jest.fn(function (key: string, value: string) {
        this[key] = value
      })
      return this
    },
  }
})

const fetchMock = jest.fn(function (
  url: RequestInfo,
  // The init argument is needed for the mock to work
  init?: RequestInit, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  switch (url) {
    case testSignUrl:
      return {
        json: async function () {
          return testSignResponse
        },
      }
    case testStatusUrl:
      return {
        json: async function () {
          return testStatusResponse
        },
      }
    default:
      throw new Error()
  }
})
jest.mock('node-fetch', function () {
  return {
    default: async function (url: RequestInfo, init: RequestInit) {
      return fetchMock(url, init)
    },
  }
})

describe('SigningService', () => {
  let signingService: SigningService

  beforeEach(async () => {
    fetchMock.mockClear()

    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggingModule, SigningModule.register(testOptions)],
    }).compile()

    signingService = module.get<SigningService>(SigningService)
  })

  it('should sign a document', async () => {
    const res = await signingService.requestSignature(
      testMobileNumber,
      testMessage,
      testContact,
      testLocation,
      testDocumentName,
      testDocumentContent,
    )

    // Verify response
    expect(res.controlCode).toBe(testSignResponse.control_code)
    expect(res.documentToken).toBe(testSignResponse.token)

    // Verify sign
    expect(fetchMock).toHaveBeenCalledWith(
      testSignUrl,
      expect.objectContaining({
        method: 'POST',
        body: expect.objectContaining({
          phone: `+354${testMobileNumber}`,
          message: `${testMessage} `,
          timestamp: 'true',
          language: 'IS',
          'pdf[contact]': testContact,
          'pdf[location]': testLocation,
          type: 'pdf',
          'pdf[files][0][name]': testDocumentName,
          'pdf[files][0][content]': Base64.btoa(testDocumentContent),
          'pdf[files][0][digest]': createHash('sha1')
            .update(testDocumentContent, 'ascii')
            .digest('hex'),
        }),
      }),
    )
  })

  it('should get a signed document', async () => {
    const res = await signingService.getSignedDocument(
      testDocumentName,
      testSignResponse.token,
    )

    // Verify response
    expect(res).toBe(Base64.atob(testStatusResponse.file.content))

    // Verify sign status
    expect(fetchMock).toHaveBeenCalledWith(testStatusUrl, undefined)
  })
})
