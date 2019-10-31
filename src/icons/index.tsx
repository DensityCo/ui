// NOTE: using `require` here is needed since we have to use `module.exports` below. Webpack won't
// let you mix `import/export` and `module.exports`.
import React from 'react';
import propTypes from 'prop-types';
import colorVariables from '../../variables/colors.json';

import Alert from './symbols/alert.js';
import ArrowDown from './symbols/arrow-down.js';
import ArrowDownLeft from './symbols/arrow-down-left.js';
import ArrowDownRight from './symbols/arrow-down-right.js';
import ArrowLeft from './symbols/arrow-left.js';
import ArrowRight from './symbols/arrow-right.js';
import ArrowUp from './symbols/arrow-up.js';
import ArrowUpLeft from './symbols/arrow-up-left.js';
import ArrowUpRight from './symbols/arrow-up-right.js';
import BookmarkFill from './symbols/bookmark-fill.js';
import BookmarkOutline from './symbols/bookmark-outline.js';
import CalendarDetail from './symbols/calendar-detail.js';
import CalendarSimple from './symbols/calendar-simple.js';
import Camera from './symbols/camera.js';
import Chart1 from './symbols/chart-1.js';
import Chart2 from './symbols/chart-2.js';
import ChartLineDown from './symbols/chart-line-down.js';
import ChartLineUp from './symbols/chart-line-up.js';
import Chat from './symbols/chat.js';
import Check from './symbols/check.js';
import CheckBox from './symbols/check-box.js';
import CheckCircle from './symbols/check-circle.js';
import ChevronDown from './symbols/chevron-down.js';
import ChevronDownCircle from './symbols/chevron-down-circle.js';
import ChevronLeft from './symbols/chevron-left.js';
import ChevronLeftCircle from './symbols/chevron-left-circle.js';
import ChevronRight from './symbols/chevron-right.js';
import ChevronRightCircle from './symbols/chevron-right-circle.js';
import ChevronUp from './symbols/chevron-up.js';
import ChevronUpCircle from './symbols/chevron-up-circle.js';
import Clock from './symbols/clock.js';
import ClockReset from './symbols/clock-reset.js';
import ClockTimer from './symbols/clock-timer.js';
import Close from './symbols/close.js';
import CloseBox from './symbols/close-box.js';
import CloseCircle from './symbols/close-circle.js';
import CloudSecure from './symbols/cloud-secure.js';
import Code from './symbols/code.js';
import Cog from './symbols/cog.js';
import Collapse from './symbols/collapse.js';
import Control1 from './symbols/control-1.js';
import Control2 from './symbols/control-2.js';
import Copy from './symbols/copy.js';
import Danger from './symbols/danger.js';
import Dashboard from './symbols/dashboard.js';
import DashboardAdd from './symbols/dashboard-add.js';
import DoNotEnter from './symbols/do-not-enter.js';
import Door from './symbols/door.js';
import Dot from './symbols/dot.js';
import Download from './symbols/download.js';
import Ebook from './symbols/ebook.js';
import EgressDown from './symbols/egress-down.js';
import EgressLeft from './symbols/egress-left.js';
import Filter from './symbols/filter.js';
import FoodUtensils from './symbols/food-utensils.js';
import Globe from './symbols/globe.js';
import HeartBeat from './symbols/heart-beat.js';
import Heart from './symbols/heart.js';
import Help from './symbols/help.js';
import ImageUpload from './symbols/image-upload.js';
import ImpersonateOff from './symbols/impersonate-off.js';
import ImpersonateOn from './symbols/impersonate-on.js';
import Info from './symbols/info.js';
import IngressRight from './symbols/ingress-right.js';
import IngressUp from './symbols/ingress-up.js';
import Integrations1 from './symbols/integrations-1.js';
import Integrations2 from './symbols/integrations-2.js';
import Interview from './symbols/interview.js';
import Keyhole from './symbols/keyhole.js';
import Lightbulb from './symbols/lightbulb.js';
import LightningFill from './symbols/lightning-fill.js';
import LightningOutline from './symbols/lightning-outline.js';
import LinkBroken from './symbols/link-broken.js';
import LinkLinked from './symbols/link-linked.js';
import List from './symbols/list.js';
import Listening from './symbols/listening.js';
import Message from './symbols/message.js';
import Minus from './symbols/minus.js';
import MinusCircle from './symbols/minus-circle.js';
import Money from './symbols/money.js';
import More from './symbols/more.js';
import Move from './symbols/move.js';
import Notification from './symbols/notification.js';
import Paintbrush from './symbols/paintbrush.js';
import Parking from './symbols/parking.js';
import PencilFill from './symbols/pencil-fill.js';
import PencilOutline from './symbols/pencil-outline.js';
import Person from './symbols/person.js';
import PersonHuddle from './symbols/person-huddle.js';
import PersonMinus from './symbols/person-minus.js';
import PersonPlus from './symbols/person-plus.js';
import PersonRemove from './symbols/person-remove.js';
import Phone from './symbols/phone.js';
import PlaybackNext from './symbols/playback-next.js';
import PlaybackPlay from './symbols/playback-play.js';
import PlaybackPrev from './symbols/playback-prev.js';
import Plus from './symbols/plus.js';
import PlusCircle from './symbols/plus-circle.js';
import Power from './symbols/power.js';
import Refresh from './symbols/refresh.js';
import Report from './symbols/report.js';
import ReportAdd from './symbols/report-add.js';
import Rotate from './symbols/rotate.js';
import SaveFill from './symbols/save-fill.js';
import SaveOutline from './symbols/save-outline.js';
import Search from './symbols/search.js';
import Security1 from './symbols/security-1.js';
import Security2 from './symbols/security-2.js';
import Security3 from './symbols/security-3.js';
import Security4 from './symbols/security-4.js';
import Share1 from './symbols/share-1.js';
import Share2 from './symbols/share-2.js';
import SoundOff from './symbols/sound-off.js';
import SoundOn from './symbols/sound-on.js';
import SpaceAdd from './symbols/space-add.js';
import StairsDown from './symbols/stairs-down.js';
import StairsUp from './symbols/stairs-up.js';
import StarFill from './symbols/star-fill.js';
import StarOutline from './symbols/star-outline.js';
import SwapHorizontal from './symbols/swap-horizontal.js';
import SwapVertical from './symbols/swap-vertical.js';
import Trash from './symbols/trash.js';
import Tray from './symbols/tray.js';
import Upload from './symbols/upload.js';
import Video from './symbols/video.js';
import VisibilityHide from './symbols/visibility-hide.js';
import VisibilityShow from './symbols/visibility-show.js';
import Workflow from './symbols/workflow.js';

import BabyChanging from './space-functions/baby-changing.js';
import BreakoutRoom from './space-functions/breakout-room.js';
import Breakroom from './space-functions/breakroom.js';
import Cafe from './space-functions/cafe.js';
import Cafeteria from './space-functions/cafeteria.js';
import CallRoom from './space-functions/call-room.js';
import ConferenceRoom from './space-functions/conference-room.js';
import EventSpace from './space-functions/event-space.js';
import Gym from './space-functions/gym.js';
import Kitchen from './space-functions/kitchen.js';
import Lab from './space-functions/lab.js';
import Lobby from './space-functions/lobby.js';
import Lounge from './space-functions/lounge.js';
import RestroomMen from './space-functions/restroom-men.js';
import RestroomUnisex from './space-functions/restroom-unisex.js';
import RestroomWomen from './space-functions/restroom-women.js';
import Study from './space-functions/study.js';
import Theater from './space-functions/theater.js';
import UtilityRoom from './space-functions/utility-room.js';

import Building from './space-types/building.js';
import Floor from './space-types/floor.js';
import Space from './space-types/space.js';

import Algo from './legacy/algo.js';
import Apps from './legacy/apps.js';
import Bucket from './legacy/bucket.js';
import Cards from './legacy/cards.js';
import Circle from './legacy/circle.js';
import Dashboards from './legacy/dashboards.js';
import DensityMark from './legacy/density-mark.js';
import DragDrop from './legacy/drag-drop.js';
import ErrorIcon from './legacy/error.js';
import Expand from './legacy/expand.js';
import Export from './legacy/export.js';
import Filters from './legacy/filters.js';
import Floorplans from './legacy/floorplans.js';
import Folder from './legacy/folder.js';
import Image from './legacy/image.js';
import L from './legacy/l.js';
import Locate from './legacy/locate.js';
import Logout from './legacy/logout.js';
import No from './legacy/no.js';
import Pin from './legacy/pin.js';
import Plane from './legacy/plane.js';
import Progress from './legacy/progress.js';
import Soup from './legacy/soup.js';
import Square from './legacy/square.js';
import Tag from './legacy/tag.js';
import Zoom from './legacy/zoom.js';

// A list of all density icons.
const ICONS = {

  // Symbols
  Alert: Alert,

  ArrowDown: ArrowDown,
  ArrowDownLeft: ArrowDownLeft,
  ArrowDownRight: ArrowDownRight,
  ArrowLeft: ArrowLeft,
  ArrowRight: ArrowRight,
  ArrowUp: ArrowUp,
  ArrowUpLeft: ArrowUpLeft,
  ArrowUpRight: ArrowUpRight,

  BookmarkFill: BookmarkFill,
  BookmarkOutline: BookmarkOutline,
  Bookmark: BookmarkOutline,

  CalendarDetail: CalendarDetail,
  CalendarSimple: CalendarSimple,
  Calendar: CalendarDetail,

  Camera: Camera,

  Chart1: Chart1,
  Chart2: Chart2,
  ChartLineDown: ChartLineDown,
  ChartLineUp: ChartLineUp,

  Chat: Chat,

  Check: Check,
  CheckBox: CheckBox,
  CheckSquare: CheckBox,
  CheckCircle: CheckCircle,

  ChevronDown: ChevronDown,
  ChevronDownCircle: ChevronDownCircle,
  ChevronLeft: ChevronLeft,
  ChevronLeftCircle: ChevronLeftCircle,
  ChevronRight: ChevronRight,
  ChevronRightCircle: ChevronRightCircle,
  ChevronUp: ChevronUp,
  ChevronUpCircle: ChevronUpCircle,

  Clock: Clock,
  ClockReset: ClockReset,
  Reset: ClockReset,
  ClockTimer: ClockTimer,
  StopWatch: ClockTimer,

  Close: Close,
  CloseBox: CloseBox,
  CloseSquare: CloseBox,
  CloseCircle: CloseCircle,

  CloudSecure: CloudSecure,
  Code: Code,
  Cog: Cog,
  Collapse: Collapse,
  Control1: Control1,
  Control2: Control2,
  Copy: Copy,
  Danger: Danger,

  Dashboard: Dashboard,
  DashboardAdd: DashboardAdd,
  DoNotEnter: DoNotEnter,
  Door: Door,
  Doorway: Door,
  Dot: Dot,
  Download: Download,
  Ebook: Ebook,

  EgressDown: EgressDown,
  EgressLeft: EgressLeft,

  Filter: Filter,
  FoodUtensils: FoodUtensils,
  Globe: Globe,

  HeartBeat: HeartBeat,
  Heartbeat: HeartBeat,
  Heart: Heart,

  Help: Help,
  ImageUpload: ImageUpload,
  ImpersonateOff: ImpersonateOff,
  ImpersonateOn: ImpersonateOn,
  Info: Info,

  IngressRight: IngressRight,
  IngressUp: IngressUp,

  Integrations1: Integrations1,
  Integrations2: Integrations2,
  Interview: Interview,
  Keyhole: Keyhole,
  Lightbulb: Lightbulb,

  LightningFill: LightningFill,
  LightningOutline: LightningOutline,
  Lightning: LightningOutline,

  LinkBroken: LinkBroken,
  LinkLinked: LinkLinked,
  Link: LinkLinked,

  List: List,
  Listening: Listening,

  Message: Message,
  Mail: Message,
  Minus: Minus,
  MinusCircle: MinusCircle,
  Money: Money,
  More: More,
  Move: Move,
  Notification: Notification,
  Paintbrush: Paintbrush,
  Parking: Parking,

  PencilFill: PencilFill,
  PencilOutline: PencilOutline,
  Pencil: PencilOutline,

  Person: Person,
  PersonHuddle: PersonHuddle,
  Team: PersonHuddle,
  PersonMinus: PersonMinus,
  PersonPlus: PersonPlus,
  PersonRemove: PersonRemove,

  Phone: Phone,
  PlaybackNext: PlaybackNext,
  PlaybackPlay: PlaybackPlay,
  PlaybackPrev: PlaybackPrev,
  Plus: Plus,
  PlusCircle: PlusCircle,
  Power: Power,
  Refresh: Refresh,

  Report: Report,
  ReportAdd: ReportAdd,
  AddReport: ReportAdd,

  Rotate: Rotate,

  SaveFill: SaveFill,
  SaveOutline: SaveOutline,
  Save: SaveOutline,

  Search: Search,

  Security1: Security1,
  Security2: Security2,
  Security3: Security3,
  Security4: Security4,
  Security: Security1,

  Share1: Share1,
  Share2: Share2,
  Share: Share2,
  SoundOff: SoundOff,
  SoundOn: SoundOn,
  SpaceAdd: SpaceAdd,

  StairsDown: StairsDown,
  StairsUp: StairsUp,

  StarFill: StarFill,
  StarOutline: StarOutline,
  Star: StarOutline,

  SwapHorizontal: SwapHorizontal,
  Switch: SwapHorizontal,
  SwapVertical: SwapVertical,

  Trash: Trash,
  Tray: Tray,
  Menu: Tray,
  Upload: Upload,
  Video: Video,

  VisibilityHide: VisibilityHide,
  Hide: VisibilityHide,
  VisibilityShow: VisibilityShow,
  Show: VisibilityShow,

  Workflow: Workflow,


  // Space Functions
  BabyChanging: BabyChanging,
  BreakoutRoom: BreakoutRoom,
  Breakroom: Breakroom,
  Cafe: Cafe,
  Cafeteria: Cafeteria,
  CallRoom: CallRoom,
  ConferenceRoom: ConferenceRoom,
  EventSpace: EventSpace,
  Gym: Gym,
  Kitchen: Kitchen,
  Lab: Lab,
  Lobby: Lobby,
  Lounge: Lounge,
  RestroomMen: RestroomMen,
  RestroomUnisex: RestroomUnisex,
  RestroomWomen: RestroomWomen,
  Study: Study,
  Theater: Theater,
  UtilityRoom: UtilityRoom,


  // Space Types
  Building: Building,
  Floor: Floor,
  Space: Space,


  // Legacy (v1) Icons
  Algo: Algo,
  Apps: Apps,
  Bucket: Bucket,
  Cards: Cards,
  Circle: Circle,
  Dashboards: Dashboards,
  DensityMark: DensityMark,
  DragDrop: DragDrop,
  Error: ErrorIcon,
  Expand: Expand,
  Export: Export,
  Filters: Filters,
  Floorplans: Floorplans,
  Folder: Folder,
  Image: Image,
  L: L,
  Locate: Locate,
  Logout: Logout,
  No: No,
  Pin: Pin,
  Plane: Plane,
  Progress: Progress,
  Soup: Soup,
  Square: Square,
  Tag: Tag,
  Zoom: Zoom,
};

// colors can either be `primary`, `darker`, or a hex/rgb color.
function parseColor(color) {
    return color && typeof color === 'string' ? (
        colorVariables[`brand${color[0].toUpperCase()}${color.slice(1)}`] || /* ie, brandPrimary */
        colorVariables[`gray${color[0].toUpperCase()}${color.slice(1)}`] || /* ie, grayDarker */
        color /* ie, #555 */
    ) : colorVariables.grayCinder; /* defaults to gray-cinder */
}

// Wrap each icon in a component.
let ICON_COMPONENTS = {};
for (let iconName in ICONS) {
  ICON_COMPONENTS[iconName] = function IconComponent(props) {
    return ICONS[iconName](Object.assign({}, props, {
        color: parseColor(props.color),
        accentColor: props.accentColor && parseColor(props.accentColor)
    }));
  }
  ICON_COMPONENTS[iconName].displayName = iconName;
  ICON_COMPONENTS[iconName].propTypes = {
    color: propTypes.string,
    accentColor: propTypes.string,
    width: propTypes.number,
    height: propTypes.number,
  };

  // Since the name of the function of each component is `IconComponent`, add a name that React will
  // use when debugging to make icons easier to identify.
  ICON_COMPONENTS[iconName].displayName = iconName;
}

// (note: must use a commonjs-style export here since the exports all aren't known at compile-time)
//module.exports = ICON_COMPONENTS;
export default ICON_COMPONENTS;
