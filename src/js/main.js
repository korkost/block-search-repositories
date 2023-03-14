import '../style/style.scss'

import { LOG } from './log.js'
import { API } from './api.js'
import { VIEW } from './view.js'
import { Search } from './search.js'


const api = new API();

new Search(new LOG(), api, new VIEW(api));
