import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import HelloWorld from './components/FullHero';

export type FullHeroProps = {
  title: string;
}

export default class FullHeroWebPart extends BaseClientSideWebPart<FullHeroProps> {

  public render(): void {
    const element: React.ReactElement<FullHeroProps> = React.createElement(
      HelloWorld,
      {
        title: this.properties.title
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(){

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
                  label: "Enter Title"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
