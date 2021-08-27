import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/core/services/data.service';
import * as moment from "moment";
import * as pluginAnnotations from "chartjs-plugin-annotation";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { RevenuesDay, RevenuesMonth } from "./../../models/revenue";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public revenuesDay: RevenuesDay[] = [];
  public revenuesMonth: RevenuesMonth[] = [];
  public fromDate = "";
  public toDate = "";
  // @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;
  displayedColumnsDay: string[] = ['Date', 'Revenues', 'Benefit'];
  displayedColumnsMonth: string[] = ['Month', 'Revenues', 'Benefit'];
  tableDataDay = new MatTableDataSource<RevenuesDay>(this.revenuesDay);
  @ViewChild(MatPaginator, { static: true }) paginatorDay!: MatPaginator;

  tableDataMonth = new MatTableDataSource<RevenuesMonth>(this.revenuesMonth);
  @ViewChild('paginatorMonth', { static: true }) paginatorMonth!: MatPaginator;
  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.loadRevenues();
    this.loadRevenuesMonth();
  }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: "Lợi nhuận ngày" },
    { data: [], label: "Doanh thu ngày" },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: "bottom" },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)",
          },
          ticks: {
            fontColor: "red",
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno",
          },
        },
      ],
    },
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = "line";
  public lineChartPlugins = [pluginAnnotations];
  // events
  public chartClicked({ event, active }: { event?: MouseEvent | undefined; active?: {}[] | undefined; }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  // refreshChart() {
  //   setTimeout(() => {
  //     if (this.chart && this.chart.chart && this.chart.chart.config) {
  //       this.chart.chart.config.data.labels = this.lineChartLabels;
  //       this.chart.chart.config.data.datasets = this.lineChartData;
  //       this.chart.chart.update();
  //     }
  //   });
  // }

  loadRevenues() {
    this._dataService
      .get(
        "/api/statistic/getrevenue?fromDate=" +
        this.fromDate +
        "&toDate=" +
        this.toDate
      )
      .subscribe((response: any) => {
        this.revenuesDay = response;
        this.lineChartLabels = [];
        this.lineChartData = [];
        var revenue = { data: [], label: "Doanh thu ngày" };
        var benefit = {
          data: [],
          label: "Lợi nhuận ngày",
          yAxisID: "y-axis-1",
        };
        this.tableDataDay = new MatTableDataSource<RevenuesDay>();
        for (let item of this.revenuesDay) {
          revenue.data.push(item.Revenues);
          benefit.data.push(item.Benefit);
          this.lineChartLabels.push(moment(item.Date).format("DD/MM/YYYY"));
          //push to table
          this.tableDataDay.data = response;
        }
        this.tableDataDay.paginator = this.paginatorDay;
        this.lineChartData.push(revenue);
        this.lineChartData.push(benefit);

        //this.refreshChart();
      });
  }

  //revenue by month use bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    legend: { position: "bottom" },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: "Lợi nhuận tháng" },
    { data: [], label: "Doanh thu tháng" },
  ];

  loadRevenuesMonth() {
    this._dataService
      .get(
        "/api/statistic/getrevenue-month?fromDate=" +
        this.fromDate +
        "&toDate=" +
        this.toDate
      )
      .subscribe((response: any) => {
        this.revenuesMonth = response;
        this.barChartLabels = [];
        this.barChartData = [];
        var revenue = { data: [], label: "Doanh thu tháng" };
        var benefit = { data: [], label: "Lợi nhuận tháng" };
        this.tableDataMonth = new MatTableDataSource<RevenuesMonth>();
        for (let item of this.revenuesMonth) {
          revenue.data.push(item.Benefit);
          benefit.data.push(item.Revenues);
          this.barChartLabels.push(item.Month);
          //push to table
          this.tableDataMonth.data = response;
        }
        this.tableDataMonth.paginator = this.paginatorMonth;
        this.barChartData.push(revenue);
        this.barChartData.push(benefit);
      });
  }

}
