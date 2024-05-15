import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StyleOptions } from '../../models/style-options';

@Component({
  selector: 'app-base-style',
  standalone: true,
  template: '',
})
export abstract class BaseStyleComponent<T> {
  @Input() public currentTheme!: T;
  @Output() public currentThemeChange = new EventEmitter<T>();
  protected abstract title: string;
  protected abstract themeOptions: StyleOptions<T>[];
  updateCurrentThemeChange() {
    this.currentThemeChange.emit(this.currentTheme);
  }
}
