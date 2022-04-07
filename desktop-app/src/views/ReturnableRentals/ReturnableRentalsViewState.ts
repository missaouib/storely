/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {RentalSort} from "../../api/enums/RentalSort";

export interface ReturnableRentalsViewState {
    offset: number;
    text: string;
    sortBy: RentalSort;
    isLoading: boolean;
}
