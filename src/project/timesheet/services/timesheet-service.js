import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { safeGet } from '../../../commons/util/utility';

@inject(HttpClient)
export class TimesheetService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  createTimesheet(timesheet) {
    const body = json(timesheet);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/Timesheet`, {
        method: 'post',
        body: body
      })
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while creating timesheet');
        }
        return response.json();
      });
  }
  getFilteredTimesheet(name, type, value){
    const data = {};
    data[name + '_fld1_op'] = type;
    data[name + '_fld1_value'] = value;
    return this.httpClient
      .fetch(`${this.baseUrl}/services/performFindList`, {
        method: 'post',
        body: json({
          "entityName": "Timesheet",
          "noConditionFind": "Y",
          "inputFields": data
        })
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res.list, []).map((timesheet) => {
          timesheet.fromDate = !!timesheet.fromDate
            ? new Date(timesheet.fromDate)
            : undefined;
          timesheet.thruDate = !!timesheet.thruDate
            ? new Date(timesheet.thruDate)
            : undefined;

          return timesheet;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
  getTimesheetList() {
    return this.httpClient
      .fetch(`${this.baseUrl}/entities/Timesheet`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((timesheet) => {
          timesheet.fromDate = !!timesheet.fromDate
            ? new Date(timesheet.fromDate)
            : undefined;
          timesheet.thruDate = !!timesheet.thruDate
            ? new Date(timesheet.thruDate)
            : undefined;

          return timesheet;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
}
