import { ChangeDetectionStrategy, Component } from '@angular/core'
import { map, startWith, switchMap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { combineLatest, from } from 'rxjs'
import {
  DownloadFormatType,
  getDownloadFormat,
  getLinksWithEsriRestFormats,
  getLinksWithWfsFormats,
} from '../links/link-utils'

@Component({
  selector: 'gn-ui-data-downloads',
  templateUrl: './data-downloads.component.html',
  styleUrls: ['./data-downloads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDownloadsComponent {
  constructor(public facade: MdViewFacade) {}

  links$ = this.facade.downloadLinks$.pipe(
    switchMap((links) => {
      const wfsLinks = links.filter((link) => /^OGC:WFS/.test(link.protocol))
      const esriRestLinks = links
        .filter((link) => /^ESRI:REST/.test(link.protocol))
        .flatMap((link) => getLinksWithEsriRestFormats(link))
      const otherLinks = links
        .filter((link) => !/^OGC:WFS|ESRI:REST/.test(link.protocol))
        .map((link) =>
          'format' in link
            ? link
            : {
                ...link,
                format: getDownloadFormat(link, DownloadFormatType.FILE),
              }
        )

      return combineLatest(
        wfsLinks.map((link) => from(getLinksWithWfsFormats(link)))
      ).pipe(
        map(
          (wfsDownloadLinks) =>
            wfsDownloadLinks.reduce((prev, curr) => [...prev, ...curr]),
          []
        ),
        map((wfsDownloadLinks) =>
          wfsDownloadLinks
            .map((link) => ({
              ...link,
              format: getDownloadFormat(link, DownloadFormatType.WFS),
            }))
            .filter((link) => link.format !== 'unknown')
        ),
        map((wfsDownloadLinks) => [
          ...otherLinks,
          ...wfsDownloadLinks,
          ...esriRestLinks,
        ]),
        startWith(otherLinks)
      )
    })
  )
}
