// NOTE: using `require` here is needed since we have to use `module.exports` below. Webpack won't
// let you mix `import/export` and `module.exports`.
import React from 'react';
import propTypes from 'prop-types';
import colorVariables from '../../variables/colors.json';

import Alert from './symbols/alert';
import ArrowDown from './symbols/arrow-down';
import ArrowDownLeft from './symbols/arrow-down-left';
import ArrowDownRight from './symbols/arrow-down-right';
import ArrowLeft from './symbols/arrow-left';
import ArrowRight from './symbols/arrow-right';
import ArrowUp from './symbols/arrow-up';
import ArrowUpLeft from './symbols/arrow-up-left';
import ArrowUpRight from './symbols/arrow-up-right';
import BookmarkFill from './symbols/bookmark-fill';
import BookmarkOutline from './symbols/bookmark-outline';
import CalendarDetail from './symbols/calendar-detail';
import CalendarSimple from './symbols/calendar-simple';
import Camera from './symbols/camera';
import Chart1 from './symbols/chart-1';
import Chart2 from './symbols/chart-2';
import ChartLineDown from './symbols/chart-line-down';
import ChartLineUp from './symbols/chart-line-up';
import Chat from './symbols/chat';
import Check from './symbols/check';
import CheckBox from './symbols/check-box';
import CheckCircle from './symbols/check-circle';
import ChevronDown from './symbols/chevron-down';
import ChevronDownCircle from './symbols/chevron-down-circle';
import ChevronLeft from './symbols/chevron-left';
import ChevronLeftCircle from './symbols/chevron-left-circle';
import ChevronRight from './symbols/chevron-right';
import ChevronRightCircle from './symbols/chevron-right-circle';
import ChevronUp from './symbols/chevron-up';
import ChevronUpCircle from './symbols/chevron-up-circle';
import Clock from './symbols/clock';
import ClockReset from './symbols/clock-reset';
import ClockTimer from './symbols/clock-timer';
import Close from './symbols/close';
import CloseBox from './symbols/close-box';
import CloseCircle from './symbols/close-circle';
import CloudSecure from './symbols/cloud-secure';
import Code from './symbols/code';
import Cog from './symbols/cog';
import Collapse from './symbols/collapse';
import Control1 from './symbols/control-1';
import Control2 from './symbols/control-2';
import Copy from './symbols/copy';
import Danger from './symbols/danger';
import Dashboard from './symbols/dashboard';
import DashboardAdd from './symbols/dashboard-add';
import DeviceSide from './symbols/device-side';
import DeviceTop from './symbols/device-top';
import DoNotEnter from './symbols/do-not-enter';
import Door from './symbols/door';
import Dot from './symbols/dot';
import Download from './symbols/download';
import Ebook from './symbols/ebook';
import EgressDown from './symbols/egress-down';
import EgressLeft from './symbols/egress-left';
import Filter from './symbols/filter';
import FoodUtensils from './symbols/food-utensils';
import Globe from './symbols/globe';
import HeartBeat from './symbols/heart-beat';
import Heart from './symbols/heart';
import Help from './symbols/help';
import ImageUpload from './symbols/image-upload';
import ImpersonateOff from './symbols/impersonate-off';
import ImpersonateOn from './symbols/impersonate-on';
import Info from './symbols/info';
import IngressRight from './symbols/ingress-right';
import IngressUp from './symbols/ingress-up';
import Integrations1 from './symbols/integrations-1';
import Integrations2 from './symbols/integrations-2';
import Interview from './symbols/interview';
import Keyhole from './symbols/keyhole';
import Lightbulb from './symbols/lightbulb';
import LightningFill from './symbols/lightning-fill';
import LightningOutline from './symbols/lightning-outline';
import LinkBroken from './symbols/link-broken';
import LinkLinked from './symbols/link-linked';
import List from './symbols/list';
import Listening from './symbols/listening';
import Message from './symbols/message';
import Minus from './symbols/minus';
import MinusCircle from './symbols/minus-circle';
import Money from './symbols/money';
import More from './symbols/more';
import Move from './symbols/move';
import Notification from './symbols/notification';
import Paintbrush from './symbols/paintbrush';
import Parking from './symbols/parking';
import PencilFill from './symbols/pencil-fill';
import PencilOutline from './symbols/pencil-outline';
import Person from './symbols/person';
import PersonHuddle from './symbols/person-huddle';
import PersonMinus from './symbols/person-minus';
import PersonPlus from './symbols/person-plus';
import PersonRemove from './symbols/person-remove';
import Phone from './symbols/phone';
import PlaybackNext from './symbols/playback-next';
import PlaybackPlay from './symbols/playback-play';
import PlaybackPrev from './symbols/playback-prev';
import Plus from './symbols/plus';
import PlusCircle from './symbols/plus-circle';
import Power from './symbols/power';
import Refresh from './symbols/refresh';
import Report from './symbols/report';
import ReportAdd from './symbols/report-add';
import ReportShare from './symbols/report-share';
import Rotate from './symbols/rotate';
import SaveFill from './symbols/save-fill';
import SaveOutline from './symbols/save-outline';
import Search from './symbols/search';
import Security1 from './symbols/security-1';
import Security2 from './symbols/security-2';
import Security3 from './symbols/security-3';
import Security4 from './symbols/security-4';
import Share1 from './symbols/share-1';
import Share2 from './symbols/share-2';
import SoundOff from './symbols/sound-off';
import SoundOn from './symbols/sound-on';
import SpaceAdd from './symbols/space-add';
import StairsDown from './symbols/stairs-down';
import StairsUp from './symbols/stairs-up';
import StarFill from './symbols/star-fill';
import StarOutline from './symbols/star-outline';
import SwapHorizontal from './symbols/swap-horizontal';
import SwapVertical from './symbols/swap-vertical';
import Trash from './symbols/trash';
import Tray from './symbols/tray';
import Upload from './symbols/upload';
import Video from './symbols/video';
import VisibilityHide from './symbols/visibility-hide';
import VisibilityShow from './symbols/visibility-show';
import Workflow from './symbols/workflow';

import BabyChanging from './space-functions/baby-changing';
import BreakoutRoom from './space-functions/breakout-room';
import Breakroom from './space-functions/breakroom';
import Cafe from './space-functions/cafe';
import Cafeteria from './space-functions/cafeteria';
import CallRoom from './space-functions/call-room';
import ConferenceRoom from './space-functions/conference-room';
import EventSpace from './space-functions/event-space';
import Gym from './space-functions/gym';
import Kitchen from './space-functions/kitchen';
import Lab from './space-functions/lab';
import Lobby from './space-functions/lobby';
import Lounge from './space-functions/lounge';
import RestroomMen from './space-functions/restroom-men';
import RestroomUnisex from './space-functions/restroom-unisex';
import RestroomWomen from './space-functions/restroom-women';
import Study from './space-functions/study';
import Theater from './space-functions/theater';
import UtilityRoom from './space-functions/utility-room';

import Building from './space-types/building';
import Floor from './space-types/floor';
import Space from './space-types/space';

import Algo from './legacy/algo';
import Apps from './legacy/apps';
import Bucket from './legacy/bucket';
import Cards from './legacy/cards';
import Circle from './legacy/circle';
import Dashboards from './legacy/dashboards';
import DensityMark from './legacy/density-mark';
import DragDrop from './legacy/drag-drop';
import ErrorIcon from './legacy/error';
import Expand from './legacy/expand';
import Export from './legacy/export';
import Filters from './legacy/filters';
import Floorplans from './legacy/floorplans';
import Folder from './legacy/folder';
import Image from './legacy/image';
import L from './legacy/l';
import Locate from './legacy/locate';
import Logout from './legacy/logout';
import No from './legacy/no';
import Pin from './legacy/pin';
import Plane from './legacy/plane';
import Progress from './legacy/progress';
import Soup from './legacy/soup';
import Square from './legacy/square';
import Tag from './legacy/tag';
import Zoom from './legacy/zoom';

// Regex for testing color values
const COLOR_REGEX = /^(currentColor)|(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))$/i;

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
  DeviceSide: DeviceSide,
  DeviceTop: DeviceTop,
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
  ReportShare: ReportShare,

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
function parseColor(color: string): string {
  if (color && typeof color === 'string') {
    let parsedColor = colorVariables[`brand${color[0].toUpperCase()}${color.slice(1)}`];
    if (parsedColor) { 
      console.warn('Semantic "brand" color values are deprecated.');
      return parsedColor;
    }
    parsedColor = colorVariables[`gray${color[0].toUpperCase()}${color.slice(1)}`];
    if (parsedColor) { 
      console.warn('Semantic "gray-dark" etc. color values are deprecated.');
      return parsedColor;
    }
    if (!COLOR_REGEX.test(color)) {
      console.warn('Unrecognized color value.');
    }
    return color;
  } else {
    return colorVariables.midnight; /* defaults to midnight */
  }
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
    width: propTypes.oneOfType([propTypes.number, propTypes.string]),
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),
  };

  // Since the name of the function of each component is `IconComponent`, add a name that React will
  // use when debugging to make icons easier to identify.
  ICON_COMPONENTS[iconName].displayName = iconName;
}

type IconComponentProps = {
  color?: string,
  accentColor?: string,
  width?: React.ReactText,
  height?: React.ReactText,
  [prop: string]: any,
};
type IconComponentDictionary = {
  [iconName in keyof typeof ICONS]: React.FunctionComponent<IconComponentProps>
};

const Icons = ICON_COMPONENTS as IconComponentDictionary;
export default Icons;
