import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {type IPropertyPaneConfiguration,PropertyPaneTextField, PropertyPaneDropdown} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import FullHero from './components/FullHero';
import { PropertyFieldFilePicker, IFilePickerResult } from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';

export type FullHeroProps = {
  title: string;
  titleColor: "dark" | "light";
  titlePosition: "left" | "right";
  titleBackground: "dark" | "light";
  image: IFilePickerResult;
  height: "short" | "medium" | "tall";
}

export default class FullHeroWebPart extends BaseClientSideWebPart<FullHeroProps> {

  public render(): void {
    const element: React.ReactElement<FullHeroProps> = React.createElement(
      FullHero,
      {
        title: this.properties.title,
        titleColor: this.properties.titleColor,
        titlePosition: this.properties.titlePosition,
        titleBackground: this.properties.titleBackground,
        image: this.properties.image,
        height: this.properties.height
      }
    );
    //HACKY FULL SCREEN WIDTH SOLUTION -- REALLY REALLY HACKY WOW
    document.querySelectorAll('.CanvasZone').forEach((element: Element) => {
      (element as HTMLElement).style.maxWidth = '100%';
    });
    document.querySelectorAll('.CanvasSection').forEach((element: Element) => {
      (element as HTMLElement).style.maxWidth = '100%';
    });
    document.querySelectorAll('.ControlZone').forEach((element: Element) => {
      (element as HTMLElement).style.maxWidth = '100%';
    });
    //BACK TO NORMAL
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(){

  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    
    if (propertyPath === 'image' && newValue) {
      // Handle the change in the image property
      // For example, refresh the web part to reflect the new image
      this.render();
    }
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "Customize your Hero" },
          groups: [
            {
              groupName: "Content",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Title"
                }),
                PropertyFieldFilePicker('image', {
                  label: "Select an Image",
                  context: this.context as any,
                  filePickerResult: this.properties.image,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onSave: (e) => {
                    this.properties.image = e;
                    this.render();
                  },
                  onChanged: (e) => {
                    this.properties.image = e;
                    this.render();
                  },
                  key: 'filePickerId'
                })
              ]
            },
            {
              groupName: "Appearance",
              groupFields: [
                PropertyPaneDropdown('titleColor', {
                  label: "Title Color",
                  options: [
                    { key: 'dark', text: 'Dark' },
                    { key: 'light', text: 'Light' }
                  ],
                  selectedKey: 'dark'
                }),
                PropertyPaneDropdown('titleBackground', {
                  label: "Title Background",
                  options: [
                    { key: 'dark', text: 'Dark' },
                    { key: 'light', text: 'Light' }
                  ],
                  selectedKey: 'dark'
                }),
                PropertyPaneDropdown('titlePosition', {
                  label: "Position",
                  options: [
                    { key: 'left', text: 'Left' },
                    { key: 'right', text: 'Right' }
                  ],
                  selectedKey: 'left'
                }),
                PropertyPaneDropdown('height', {
                  label: "Height",
                  options: [
                    { key: 'short', text: 'Short' },
                    { key: 'medium', text: 'Medium' },
                    { key: 'tall', text: 'Tall' }
                  ],
                  selectedKey: 'medium'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
