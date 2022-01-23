import { Injectable } from '@angular/core'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiUrl
  
  constructor(
    private http: HttpClient) { }

  save(obj) {
    return this.http.post(this.apiUrl, obj)
  }

  getFormData(form_id, data_id) {
    return this.http.get(this.apiUrl + 'form/' + form_id + '/' + data_id + '/')
  }

  getData(obj) {
    return this.http.get(this.apiUrl + obj.tenant_id + '/' + obj.form_id + '/')
  }

  saveList(obj) {
    return this.http.post(this.apiUrl+'list/', obj)
  }

  getLists(obj) {
    return this.http.post(this.apiUrl+'lists/', obj)
  }

  getEmailList(obj) {
    return this.http.post(this.apiUrl+'emails/', obj)
  }

  update(obj) {
    return this.http.put(this.apiUrl, obj)
  }

  delete(obj) {
    return this.http.post(this.apiUrl+'delete/', obj)
  }

  getFile(path) {
    return this.http.get(this.apiUrl+'file/' + path + '/')
  }

  signForm(obj) {
    return this.http.put(this.apiUrl+'form/sign/', obj)
  }

  getPDF(name) {
    try {
      let headers = new HttpHeaders().set('Accept', 'application/pdf')
      this.http.get(this.apiUrl + 'pdf/' + name + '/', {
        headers: headers,
        responseType: 'blob'
      }).subscribe(data => {
        const blob: Blob = new Blob([data], { type: 'application/pdf' });
        const fileName = name;
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      })
    }
    catch (error) {
      throw error;
    }
  }

}
