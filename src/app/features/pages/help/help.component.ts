import { Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { HelpTreeComponent } from 'app/core/components/help-tree/help-tree.component';
import { TreeNode } from 'app/core/components/help-tree/interfaces/tree-node';
import { HELP_IDENTIFIER } from 'app/core/constants/help-identifier.constants';
import { IconName } from 'app/shared/components/icon/icon-name.enum';
import { TemperatureChartComponent } from './help-sections/temperature-chart/temperature-chart.component';
import { SensorsComponent } from './help-sections/sensors/sensors.component';
import { BasicSettingsComponent } from './help-sections/basic-settings/basic-settings.component';
import { GeneralComponent } from './help-sections/advanced-settings/general/general.component';
import { NetworkComponent } from './help-sections/advanced-settings/network/network.component';
import { SecurityComponent } from './help-sections/advanced-settings/security/security.component';
import { SystemComponent } from './help-sections/advanced-settings/system/system.component';
import { AssemblyComponent } from './help-sections/pysical-sensor/assembly/assembly.component';
import { ConfigurationComponent } from './help-sections/pysical-sensor/configuration/configuration.component';
import { UsageComponent } from './help-sections/pysical-sensor/usage/usage.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './help-sections/about/about.component';

@Component({
  selector: 'app-help',
  imports: [CommonModule, HelpTreeComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.less',
  encapsulation: ViewEncapsulation.None,
})
export class HelpComponent {
  protected iconName = IconName;
  protected treeData: TreeNode = {
    text: 'Home',
    icon: IconName.Home,
    hasTour: true,
    children: [
      {
        identifier: HELP_IDENTIFIER.TEMPERATURE_CHART,
        text: 'Temperature Chart',
        icon: IconName.Chart,
        hasTour: true,
      },
      {
        identifier: HELP_IDENTIFIER.SENSORS,
        text: 'Sensors',
        icon: IconName.Gauge,
        hasTour: true,
      },
      {
        identifier: HELP_IDENTIFIER.BASIC_SETTINGS,
        text: 'Basic Settings',
        icon: IconName.Cog,
        hasTour: true,
      },
      {
        text: 'Advanced Settings',
        icon: IconName.Sliders,
        hasTour: true,
        children: [
          {
            identifier: HELP_IDENTIFIER.ADVANCED_SETTINGS_GENERAL,
            text: 'General',
            icon: IconName.Cog,
          },
          {
            identifier: HELP_IDENTIFIER.ADVANCED_SETTINGS_NETWORK,
            text: 'Network',
            icon: IconName.Network,
          },
          {
            identifier: HELP_IDENTIFIER.ADVANCED_SETTINGS_SECURITY,
            text: 'Security',
            icon: IconName.Shield,
          },
          {
            identifier: HELP_IDENTIFIER.ADVANCED_SETTINGS_SYSTEM,
            text: 'System',
            icon: IconName.System,
          },
        ],
      },
      {
        text: 'Physical Sensor',
        icon: IconName.Device,
        children: [
          {
            identifier: HELP_IDENTIFIER.PHYSICAL_SENSOR_ASSEMBLY,
            text: 'Assembly',
            icon: IconName.Assembly,
          },
          {
            identifier: HELP_IDENTIFIER.PHYSICAL_SENSOR_CONFIGURATION,
            text: 'Configuration',
            icon: IconName.Cog,
          },
          {
            identifier: HELP_IDENTIFIER.PHYSICAL_SENSOR_USAGE,
            text: 'Usage',
          },
        ],
      },
      {
        text: 'About',
        icon: IconName.Info,
        identifier: HELP_IDENTIFIER.ABOUT,
      },
    ],
  };

  private helpIdentifier = signal<string>('');

  currentComponent = computed(() => {
    switch (this.helpIdentifier()) {
      case HELP_IDENTIFIER.TEMPERATURE_CHART:
        return TemperatureChartComponent;
      case HELP_IDENTIFIER.SENSORS:
        return SensorsComponent;
      case HELP_IDENTIFIER.BASIC_SETTINGS:
        return BasicSettingsComponent;
      case HELP_IDENTIFIER.ADVANCED_SETTINGS_GENERAL:
        return GeneralComponent;
      case HELP_IDENTIFIER.ADVANCED_SETTINGS_NETWORK:
        return NetworkComponent;
      case HELP_IDENTIFIER.ADVANCED_SETTINGS_SECURITY:
        return SecurityComponent;
      case HELP_IDENTIFIER.ADVANCED_SETTINGS_SYSTEM:
        return SystemComponent;
      case HELP_IDENTIFIER.PHYSICAL_SENSOR_ASSEMBLY:
        return AssemblyComponent;
      case HELP_IDENTIFIER.PHYSICAL_SENSOR_CONFIGURATION:
        return ConfigurationComponent;
      case HELP_IDENTIFIER.PHYSICAL_SENSOR_USAGE:
        return UsageComponent;
      case HELP_IDENTIFIER.ABOUT:
        return AboutComponent;
      default:
        return AboutComponent;
    }
  });

  setHelpConent(index: string) {
    this.helpIdentifier.set(index);
    switch (index) {
      case HELP_IDENTIFIER.TEMPERATURE_CHART:
        break;
    }
  }

  startTour(index: string) {
    //TODO: WIRE TOUR FOR THE SPECIFIED ITEM
    alert(index);
  }
}
