import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntappdService } from '../service/untappd.service';
import { RateBeerService } from '../service/ratebeer.service';
import { RateBeer } from '../model/ratebeer.model';
import { NavbarService } from '../service/navbar.service';
import { Untappd, UntappdBeer } from '../model/untappd.model';

@Component({
  selector: 'app-find-beer',
  templateUrl: './find-beer.component.html',
  styleUrls: ['./find-beer.component.css']
})
export class FindBeerComponent implements OnInit {
  constructor(
    public nav: NavbarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private untappdService: UntappdService,
    private rateBeerService: RateBeerService) {
      this.route.params.subscribe( params => {
        this.getBeerData(params.query);
        this.setPlaceholder(params.query);
      });
   }

  searchForm: FormGroup;
  items: Array<Untappd>;
  query: string;
  page: number;
  placeholder: string;

  setPlaceholder(placeholder: any) {
    this.placeholder = placeholder;
  }

  ngOnInit() {
    this.nav.hide();
    const searchterm = '';
    this.searchForm = this.formBuilder.group({
      searchterm
    });
  }

  getBeerData(query) {
    this.untappdService.searchUntappdBeer(query)
    .subscribe(
      data => {
        const newArray = [];
        data.response.beers.items.forEach((v, i) => {
          newArray.push(v);
        });
        console.log(newArray);
        this.items = newArray;
      }
    );
  }

  addLike(item) {
    item.likes ? item.likes += 1 : item.likes = 1;
  }

  goToDetail() {
    try {
      console.log('test');
    } catch (e) {
      console.log(e);
    }
  }

  goToBrewDetail() {
    try {
      console.log('test2');
    } catch (e) {
      console.log(e);
    }
  }

  search() {
    if (this.searchForm.value.searchterm) {
      this.router.navigate([`search/${this.searchForm.value.searchterm}/1`]);
      this.searchForm.reset();
    }
  }

}
