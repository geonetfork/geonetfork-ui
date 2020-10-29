/**
 * GeoNetwork 4.0.0 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.0.0
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { InfoReportApiModel } from './infoReport.api.model'
import { ReplaceReportApiModel } from './replaceReport.api.model'
import { ReportApiModel } from './report.api.model'

export interface MetadataReplacementProcessingReportApiModel {
  errors?: Array<ReportApiModel>
  infos?: Array<InfoReportApiModel>
  uuid?: string
  totalRecords?: number
  metadata?: Set<number>
  metadataErrors?: { [key: string]: Array<ReportApiModel> }
  metadataInfos?: { [key: string]: Array<InfoReportApiModel> }
  processId?: string
  metadataChanges?: { [key: string]: ReplaceReportApiModel }
  numberOfRecordsChanged?: number
  numberOfRecordsNotChanged?: number
  noProcessFoundCount?: number
  numberOfNullRecords?: number
  numberOfRecords?: number
  numberOfRecordsProcessed?: number
  numberOfRecordsWithErrors?: number
  numberOfRecordNotFound?: number
  numberOfRecordsNotEditable?: number
  startIsoDateTime?: string
  endIsoDateTime?: string
  ellapsedTimeInSeconds?: number
  totalTimeInSeconds?: number
  running?: boolean
  type?: string
}
