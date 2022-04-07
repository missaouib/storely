/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ApiClient} from "../../api/client/ApiClient";
import EventBus from "js-event-bus";
import {ApiViewEvents} from "../../utilities/ApiViewEvents";
import {UIError} from "../../errors/UiError";
import {ApiViewNames} from "../../utilities/ApiViewNames";
import {ErrorFactory} from "../../errors/ErrorFactory";
import {ItemSort} from "../../api/enums/ItemSort";
import {ItemView} from "../../api/entities/ItemView";

export class ItemsContainerViewModel {

    private readonly _apiClient: ApiClient;
    private readonly _eventBus: EventBus;
    private readonly _apiViewEvents: ApiViewEvents;

    public constructor(
        apiClient: ApiClient,
        eventBus: EventBus,
        apiViewEvents: ApiViewEvents,
    ) {
        this._apiClient = apiClient;
        this._eventBus = eventBus;
        this._apiViewEvents = apiViewEvents;
    }


    public get eventBus(): EventBus {
        return this._eventBus;
    }


    public async callApi(
        onSuccess: (items: ItemView[]) => void,
        onError: (error: UIError) => void,
        search:string,
        offset:number,
        sort:ItemSort): Promise<void> {

        try {
            this._apiViewEvents.onViewLoading(ApiViewNames.Main);
            const items = await this._apiClient.getItems(search, offset, sort);
            this._apiViewEvents.onViewLoaded(ApiViewNames.Main);
            onSuccess(items);


        } catch (e) {
            console.log("EEE",e);
            const error = ErrorFactory.fromException(e);
            this._apiViewEvents.onViewLoadFailed(ApiViewNames.Main, error);
            onError(error);
        }
    }
}
