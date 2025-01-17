/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { SearchIndex } from '../../enums/search.enum';
import { EntityUnion, ExploreQuickFilterField } from './explore.interface';

export interface ExploreQuickFiltersProps {
  index: SearchIndex;
  fields: Array<ExploreQuickFilterField>;
  onFieldValueSelect: (field: ExploreQuickFilterField) => void;
  onAdvanceSearch: () => void;
}

export interface FilterFieldsMenuItem {
  key: string;
  label: string;
  defaultField: boolean;
}

export interface FormattedSuggestResponseObject {
  text: string;
  source: EntityUnion;
}
