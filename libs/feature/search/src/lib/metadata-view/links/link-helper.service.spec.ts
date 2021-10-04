import { TestBed } from '@angular/core/testing'
import { LinkClassifierService, LinkUsage } from './link-classifier.service'
import {
  RECORDS_FULL_FIXTURE,
  RECORDS_SUMMARY_FIXTURE,
} from '@geonetwork-ui/ui/search'
import {
  MetadataLink,
  MetadataRecord,
  RECORD_LINK_FIXTURE_WMS,
} from '@geonetwork-ui/util/shared'

import { LinkHelperService } from './link-helper.service'

let linkUsage: LinkUsage[]
const linkClassifierMock = {
  getUsagesForLink: jest.fn(() => linkUsage),
}

describe('LinkHelperService', () => {
  let service: LinkHelperService
  let link: MetadataLink
  let metadata: MetadataRecord
  let result

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LinkClassifierService,
          useValue: linkClassifierMock,
        },
      ],
    })
    service = TestBed.inject(LinkHelperService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#hasLinks', () => {
    describe('when the record has links', () => {
      beforeEach(() => {
        metadata = RECORDS_FULL_FIXTURE[0]
        result = service.hasLinks(metadata)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('when the record has no links', () => {
      beforeEach(() => {
        metadata = RECORDS_SUMMARY_FIXTURE[0]
        result = service.hasLinks(metadata)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#isDataLink', () => {
    describe('empty link usages', () => {
      beforeEach(() => {
        linkUsage = []
        result = service.isDataLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
    describe('with link usages', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.DOWNLOAD]
        result = service.isDownloadLink(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
  })
  describe('#isOtherLink', () => {
    describe('empty link usages', () => {
      beforeEach(() => {
        linkUsage = []
        result = service.isOtherLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('with link usages', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.DOWNLOAD]
        result = service.isOtherLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })
  describe('#isValidLink', () => {
    describe('valid link', () => {
      beforeEach(() => {
        link = RECORD_LINK_FIXTURE_WMS
        result = service.isValidLink(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('invalid link', () => {
      beforeEach(() => {
        link = {
          invalid: true,
          reason: 'no',
        }
        result = service.isValidLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#isMapLink', () => {
    describe('MAP usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI, LinkUsage.DOWNLOAD]
        result = service.isMapApiLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('no MAP usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.DOWNLOAD]
        result = service.isMapApiLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#isDownloadLink', () => {
    describe('DOWNLAD usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI, LinkUsage.DOWNLOAD]
        result = service.isDownloadLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('no MAP usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI]
        result = service.isDownloadLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })
})
