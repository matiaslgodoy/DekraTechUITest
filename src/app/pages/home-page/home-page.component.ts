import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserApiService } from 'user-management-lib';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatIconModule, MatButton, RouterLink, TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private _userApiService = inject(UserApiService);
  userCount = this._userApiService.userList().length;
}
