import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import { ChartType } from 'angular-google-charts';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chartDiv') chartDiv!: ElementRef;
  public date : any = "last7"
  public dateRange: any = [new Date().setDate(new Date().getDate() - 7), new Date()]
  loading = false

  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
  
  public colors = ['#EF5350', '#607D8B', '#311B92', '#D50000', '#FFEA00']
  public width = 400
  public height = 400
  

  public postPerSiteChart: any = {
    title: "Posts Per Site",
    type: ChartType.PieChart,
    columnNames: ["Site", "Post Count"],
    options: {   
      showTip: true,
      is3D: true,
      colors: this.colors,
    },
   
  }

  public tableChart: any = {
    title: "Visitor`s",
    type: ChartType.Table,
    columnNames: ['', ''],
    options: {   
      showTip: true,
      is3D: true,
      colors: this.colors,
    }
  }

  public countryChart: any = {
    title: "Visitor`s Counrty",
    type: ChartType.PieChart,
    columnNames: ['', ''],
    options: {   
      showTip: true,
      colors: this.colors,
      is3D: true
    }
  }

  public searchEngineChart: any = {
    title: "Search Engine",
    type: ChartType.PieChart,
    columnNames: ['', ''],
    options: {   
      showTip: true,
      colors: this.colors,
      is3D: true
    }
  }

  public socialChart: any = {
    title: "Social Media",
    type: ChartType.PieChart,
    columnNames: ['', ''],
    options: {   
      showTip: true,
      colors: this.colors,
      is3D: true
    }
  }

  public deviceChart: any = {
    title: "Device",
    type: ChartType.PieChart,
    columnNames: ['', ''],
    options: {   
      showTip: true,
      colors: this.colors,
      is3D: true
    }
  }

  public liveVisitorChart: any = {
    title: "Live Visitors",
    type: ChartType.BarChart,
    columnNames: ['', ''],
    options: {   
      showTip: true,
      colors: this.colors,
    }
  }

  public dayWiseVisitorChart: any = {
    title: "Daily Visitors",
    type: ChartType.LineChart,
    columnNames: ['Visits', 'Views'],
    options: {   
      showTip: true,
      colors: this.colors,
      is3D: true
    },
   
  }

  public visitorDetailsData: any[] = []

  ngAfterViewInit(): void {
    // this.width = this.chartDiv.nativeElement.offsetWidth;
  }

  public visitChart: any = {
    title: "Visitor`s Per URl",
    type: ChartType.Table,
    columnNames: ['Page Url', 'Visit', "Page Load Time", "Time On Page", "Bounce Rate", "Time Spent"],
    options: {
      showTip: true,
      colors: this.colors,
      is3D: true
    }
  }

  public cardTmpData: any[] = []

  constructor(private http: HttpClient,private alert: AlertService, private router: Router) {}

  loadDate(){
    this.postPerSiteChart.data = []
    this.tableChart.data = []
    this.countryChart.data = []
    this.searchEngineChart.data = []
    this.socialChart.data = []
    this.deviceChart.data = []
    this.dayWiseVisitorChart.data = []
    // this.getVisits()
    // this.getVisitorsSummary()
    // this.getCounryWise()
    // this.getSearchEngine()
    // this.getSocial()
    // this.getDevice()
    // this.getDailyVisitors()
  }

  ngOnInit() {
    // this.loadDate()
    // this.getLiveVisitors()
    // this.getVisitorsDetails()
    // this.getTotalPostsCount()
  }

  // getVisitorsSummary(){
  //   this.loading = true
  //   this.getAnalyticsData().subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       this.tableChart.data = [
  //         ['Total Visits',  {v: data.nb_visits}],
  //         ['Actions',  {v: data.nb_actions}],
  //         ['Actions Per Visit',  {v: data.nb_actions_per_visit}],
  //         ['Bounce Rate',  { f: data.bounce_rate}],
  //         ['Bounce Count',  {v: data.bounce_count}],
  //         ['Avg Time On Site',  {f: data.avg_time_on_site + "s"}],
  //       ]
  //       this.loading = false
  //     }
  //   }, err => {
  //     this.loading = false
  //     this.alert.showAlert('Error fetching data')
  //   })
  // }

  // getCounryWise(){
  //   this.getAnalyticsData("UserCountry.getCountry").subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       var counrtyData: any[] = []
  //       data.forEach((visit: any) => {
  //         counrtyData.push([visit.label +"("+visit.nb_visits + ")", visit.nb_visits])
  //       });

  //       this.countryChart.data = counrtyData
        
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })
  // }

  // getSearchEngine(){
  //   this.getAnalyticsData("Referrers.getSearchEngines").subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       var searchEngineData: any[] = []
  //       data.forEach((visit: any) => {
  //         searchEngineData.push([visit.label +"("+visit.nb_visits + ")", visit.nb_visits])
  //       });

  //       this.searchEngineChart.data = searchEngineData
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })
  // }

  // getSocial(){
  //   this.getAnalyticsData("Referrers.getSocials").subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       var socialData: any[] = []
  //       data.forEach((visit: any) => {
  //         socialData.push([visit.label +"("+visit.nb_visits + ")", visit.nb_visits])
  //       });

  //       this.socialChart.data = socialData
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })
  // }

  // getDevice(){
  //   this.getAnalyticsData("DevicesDetection.getType").subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       var deviceData: any[] = []
  //       data.forEach((visit: any) => {
  //         deviceData.push([visit.label +"("+visit.nb_visits + ")", visit.nb_visits])
  //       });

  //       this.deviceChart.data = deviceData
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })
  // }

  // getVisits(){

  //   this.getAnalyticsData("Actions.getPageUrls").subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       var visitData: any[] = []
  //       var total = 0
  //       data.forEach((visit: any) => {
  //         var label = visit.url? visit.url: visit.label
  //         visitData.push([
  //           label.replaceAll("https://", "").substring(0, 48), 
  //           visit.nb_visits, 
  //           visit.avg_page_load_time.toFixed(2), 
  //           visit.avg_time_on_page, 
  //           visit.bounce_rate, 
  //           visit.sum_time_spent
  //         ])
  //         total += visit.nb_visits
  //       });

  //       this.visitChart.data = [['Page Url', 'Visit', "Page Load Time", "Time On Page", "Bounce Rate", "Time Spent"],...visitData]
  //       this.tableChart.data.push(["Views", total])
        
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })

  // }

  // getDailyVisitors(){
  //   var startDate = this.formattedDate(this.dateRange[0])
  //   var endDate = this.formattedDate(this.dateRange[1])
  //   this.http.get(`${environment.matomoHost}?module=API&method=API.get&format=JSON&token_auth=${environment.matomoApiKey}&idSite=2&period=day&date=${startDate},${endDate}&filter_limit=-1&format_metrics=1&method=VisitsSummary.getVisits`).subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       this.dayWiseVisitorChart.data = []
  //       Object.keys(data).forEach(key => {
  //         this.dayWiseVisitorChart.data.push([new Date(key), data[key]])
  //       });
        
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })

  // }

  // getLiveVisitors(){
  //   this.http.get(`${environment.matomoHost}?module=API&method=Live.getCounters&format=JSON&token_auth=${environment.matomoApiKey}&idSite=2&lastMinutes=30`).subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       this.liveVisitorChart.data = [
  //         ["visitors", parseInt(data[0].visitors)],
  //         // ["visits", parseInt(data[0].visits)],
  //         // ["actions", parseInt(data[0].actions)],
  //       ]
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })

  // }

  // expandSet = new Set<number>();
  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }

  // getVisitorsDetails(){
  //   this.http.get(`${environment.matomoHost}?module=API&method=Live.getLastVisitsDetails&format=JSON&token_auth=${environment.matomoApiKey}&idSite=2&period=range&date=last2&expanded=1&filter_limit=50`).subscribe((data: any) => {
  //     if (data.result == "error"){
  //       this.alert.showAlert(data.message)
  //     }else{
  //       this.visitorDetailsData = data
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })

  // }

  

  // getAnalyticsData(method= "VisitsSummary.get", segment = ""){

  //   var startDate = this.formattedDate(this.dateRange[0])
  //   var endDate = this.formattedDate(this.dateRange[1])

  //   return this.http.get(`${environment.matomoHost}?module=API&method=${method}&format=JSON&token_auth=${environment.matomoApiKey}&idSite=2&period=range&date=${startDate},${endDate}&segment=${segment}&expanded=0&filter_limit=-1`)
  // }

  // getTotalPostsCount(site = '') {
  //   var queries = ""
  //   if (site) {
  //     queries = `&where=site='${site}'`
  //   }
  //   this.http.get(`${environment.apiHost}/database/blogs?limit=1&offset=0&select=id${queries}`).subscribe((res: any) => {
  //     if (res.status == 'success') {
  //       var total = res.data.total
  //       switch (site) {
  //         case 'golang':
  //           this.cardTmpData.push(["Golang", total])
  //           this.getTotalPostsCount('javascript')
  //           break
  //         case 'javascript':
  //           this.cardTmpData.push(["Javascript", total])
  //           this.getTotalPostsCount('python')
  //           break
  //         case 'python':
  //           this.cardTmpData.push(["Python", total])
  //           this.getTotalPostsCount('withcodeexample')
  //           break
  //         case 'withcodeexample':
  //           this.cardTmpData.push(["With Code Example", total])
  //           break
  //         default:
  //           this.getTotalPostsCount('golang')
            
  //       }
        
  //       this.postPerSiteChart.data = [...this.cardTmpData]
  //     }
  //   }, err => {
  //     this.alert.showAlert('Error fetching data')
  //   })

  // }
  // logout() {
  //   // this.api.account().deleteSession('current').then(res => {
  //   //   this.router.navigate(["/admin/auth/login"])
  //   // }, err => {
  //   //   this.alert.showAlert('Error logging out')
  //   // })
  // }

  // onDateRangeChange(event: any){
  //   if (event.length > 0){
  //     this.dateRange = event
  //     this.loadDate()
  //   }
  // }
  // onDateChange(event: any){
  //   if (event == "last7"){
  //     this.dateRange = [new Date().setDate(new Date().getDate() - 7), new Date()]
  //   }else if (event == "last30"){
  //     this.dateRange = [new Date().setDate(new Date().getDate() - 30), new Date()]
  //   }else if (event == "last90"){
  //     this.dateRange = [new Date().setDate(new Date().getDate() - 90), new Date()]
  //   }else if (event == "last1"){
  //     this.dateRange = [new Date().setDate(new Date().getDate() - 1), new Date()]
  //   }else if (event == "last180"){
  //     this.dateRange = [new Date().setDate(new Date().getDate() - 180), new Date()]
  //   }
  //   this.date = event
  //   this.loadDate()
  // }

  // formattedDate(currentDate: any){
  //   currentDate = new Date(currentDate)
  //   var year = currentDate.getFullYear();
  //   var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  //   var day = ('0' + currentDate.getDate()).slice(-2);
  //   return year + '-' + month + '-' + day;
  // }

}
