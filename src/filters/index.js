/**
 * Import Vue
 */
import Vue from "vue";

/**
 * Reading Time Filter
 */
import ReadingTime from "./readingtime";
import { ReadingTimeOptions } from "@/constants/config";
Vue.use(ReadingTime, ReadingTimeOptions);

/**
 * Capitalize Filter
 */
import Capitalize from "./capitalize";
Vue.use(Capitalize);

/**
 * Read More Filter
 */
import ReadMore from "./readmore";
Vue.use(ReadMore);

/**
 * At Index Filter
 */
import At from "./at/index";
Vue.use(At);

/**
 * First Filter
 */
import First from "./first";
Vue.use(First);

/**
 * Last Filter
 */
import Last from "./last";
Vue.use(Last);

/**
 * Contains Filter
 */
import Contains from "./contains";
Vue.use(Contains);

/**
 * Min Filter
 */
import Min from "./min";
Vue.use(Min);

/**
 * Max Filter
 */
import Max from "./max";
Vue.use(Max);

/**
 * Total Filter
 */
import Total from "./total";
Vue.use(Total);

/**
 * Unique Filter
 */
import Unique from "./unique";
Vue.use(Unique);

/**
 * Get Filter
 */
import Get from "./get";
Vue.use(Get);
