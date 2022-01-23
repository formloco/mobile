import { AppsState } from './apps/apps.state'
import { AuthState } from './auth/auth.state'
import { AssetState } from './asset/asset.state'
import { DeviceState } from './device/device.state'
import { NotificationState } from './notification/notification.state'
import { CommentState } from '../component/comment/state/comment.state'
import { SpotCheckSafetyState } from '../component/forms/spot-check-safety/state/spot-check-safety.state'
import { VehicleInspectionState } from '../component/forms/vehicle-inspection/state/vehicle-inspection.state'
import { WorksiteSafetyInspectionState } from '../component/forms/worksite-safety-inspection/state/worksite-safety-inspection.state'

export const States = [
  AppsState,
  AuthState,
  AssetState,
  DeviceState,
  CommentState,
  NotificationState,
  SpotCheckSafetyState,
  VehicleInspectionState,
  WorksiteSafetyInspectionState
];
