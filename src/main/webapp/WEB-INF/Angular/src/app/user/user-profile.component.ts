import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IUser} from '../model/User';
import {AuthService} from '../core/auth.service';
import {SubSink} from 'subsink';
import {UserDataService} from '../core/user-data.service';
import {UserStatusService} from '../core/user-status.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  user = {} as IUser;
  buttonAction = {bio: 'Edit', gender: 'Edit', location: 'Edit', work: 'Edit', school: 'Edit'};
  editStatus = {bio: false, gender: false, location: false, work: false, school: false};
  genderChoices: string[] = ['Male', 'Female', 'Secret'];
  editDes = [false, ''];
  editTags = [false, ''];
  userProfileForm: FormGroup;

  enableEdit(field: string, buttonAction: any) {
    if (buttonAction[field] === 'Edit') {
      this.editStatus[field] = true;
      this.buttonAction[field] = 'Confirm';
    } else {
      // todo: if nothing changed then do nothing
      this.updateUserDetail(this.userProfileForm.get(field).value, field);
      this.editStatus[field] = false;
      this.buttonAction[field] = 'Edit';
    }
  }

  private updateUserDetail(fieldValue: string, fieldName: string) {
    this.user[fieldName] = fieldValue;
    this.userService.updateUser(this.user);

    // need to update the user in the local storage as well
    this.userStatusService.setLoggedInUser(this.user);
  }

  onSubmit() {

  }

  constructor(private fb: FormBuilder,
              private userService: UserDataService,
              private userStatusService: UserStatusService) {
  }

  ngOnInit() {

    console.log('init user profile');
    // get user for logged in user
    this.user = this.userStatusService.getLoggedInUser();
    /*this.subs.sink = this.userService.getUser(this.user.email)
      .subscribe((data: IUser) => {
        this.user = data;
      });*/
    // watch the changes of a form control
    /*    this.userProfileForm.get('gender').valueChanges
          .subscribe(value => {
            console.log('value changed to: ' + value);
            this.user = value;
          });*/

    // create a root form group
    // todo: this user is actually from local storage
    this.userProfileForm = this.fb.group({
      bio: [this.user.bio],
      gender: [this.user.gender],
      location: [this.user.location],
      school: [this.user.school],
      work: [this.user.work],
    });

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
