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

import { Button } from 'antd';
import Loader from 'components/Loader/Loader';
import { OperationPermission } from 'components/PermissionProvider/PermissionProvider.interface';
import { GLOSSARIES_DOCS } from 'constants/docs.constants';
import { ERROR_PLACEHOLDER_TYPE } from 'enums/common.enum';
import { t } from 'i18next';
import { AssetsDataType } from 'Models';
import React from 'react';
import { PAGE_SIZE } from '../../../constants/constants';
import { Paging } from '../../../generated/type/paging';
import { getTierFromEntityInfo } from '../../../utils/CommonUtils';
import ErrorPlaceHolder from '../../common/error-with-placeholder/ErrorPlaceHolder';
import NextPrevious from '../../common/next-previous/NextPrevious';
import TableDataCard from '../../common/table-data-card/TableDataCard';

interface Props {
  assetData: AssetsDataType;
  currentPage: number;
  onAssetPaginate: (num: string | number, activePage?: number) => void;
  permissions: OperationPermission;
}

const AssetsTabs = ({
  assetData,
  onAssetPaginate,
  currentPage,
  permissions,
}: Props) => {
  if (assetData.isLoading) {
    return <Loader />;
  }

  return (
    <div data-testid="table-container">
      {assetData.data.length ? (
        <>
          {assetData.data.map((entity, index) => (
            <div className="m-b-sm" key={index}>
              <TableDataCard
                database={entity.database}
                databaseSchema={entity.databaseSchema}
                deleted={entity.deleted}
                description={entity.description}
                fullyQualifiedName={entity.fullyQualifiedName}
                id={`tabledatacard${index}`}
                indexType={entity.index}
                name={entity.name}
                owner={entity.owner}
                service={entity.service}
                serviceType={entity.serviceType || '--'}
                tags={entity.tags}
                tier={getTierFromEntityInfo(entity)}
                usage={entity.weeklyPercentileRank}
              />
            </div>
          ))}
          {assetData.total > PAGE_SIZE && assetData.data.length > 0 && (
            <NextPrevious
              isNumberBased
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              paging={{} as Paging}
              pagingHandler={onAssetPaginate}
              totalCount={assetData.total}
            />
          )}
        </>
      ) : (
        <div className="m-t-xlg">
          <ErrorPlaceHolder
            buttons={
              <div className="tw-text-lg tw-text-center">
                {permissions.Create && (
                  <Button
                    ghost
                    data-testid="add-new-asset-button"
                    type="primary">
                    {t('label.add-entity', {
                      entity: t('label.asset'),
                    })}
                  </Button>
                )}
              </div>
            }
            doc={GLOSSARIES_DOCS}
            heading={t('label.asset')}
            type={ERROR_PLACEHOLDER_TYPE.ADD}
          />
        </div>
      )}
    </div>
  );
};

export default AssetsTabs;
