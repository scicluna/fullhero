import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {type IPropertyPaneConfiguration,PropertyPaneTextField} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import FullHero from './components/FullHero';
import { PropertyFieldFilePicker, IFilePickerResult } from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';

export type FullHeroProps = {
  title: string;
  image: IFilePickerResult;
}

export default class FullHeroWebPart extends BaseClientSideWebPart<FullHeroProps> {

  public render(): void {
    const element: React.ReactElement<FullHeroProps> = React.createElement(
      FullHero,
      {
        title: this.properties.title,
        image: this.properties.image
      }
    );
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
          header: {
            description: "Edit"
          },
          groups: [
            {
              groupName: "Title",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Enter Title",
                  value: "Awesome Title"
                })
              ]
            },
            {

              groupName: "Image",
              groupFields: [
                PropertyFieldFilePicker('image', {
                  context: this.context as any,
                  filePickerResult: this.properties.image,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    console.log('FilePicker Save Event', e);
                    if (e.fileAbsoluteUrl) {
                      this.properties.image = e;
                      this.render();
                    }
                  },
                  onChanged: (e: IFilePickerResult) => {
                    console.log('FilePicker Changed Event', e);
                    if (e.fileAbsoluteUrl) {
                      this.properties.image = e;
                      this.render();
                    }
                  },
                  key: 'filePickerId',
                  buttonLabel: "Select Image",
                  label : "Choose your image"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
