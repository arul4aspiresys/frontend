import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CustomersService } from "../app/services/customers.service";
import { TestBed } from "@angular/core/testing";
import { CustomerDetail, CustomerOutput } from "../app/models/customers.interface";
import { createCustomerPayloadStub, customerStub1, baseURLCustomersStub, customerListStub, getCustomerIDStub } from "./spec-helper/customer.service.spec-helper";

describe('CustomersService', () => {
    let service: CustomersService;
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                CustomersService,
            ]
        });

        service = TestBed.inject(CustomersService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('creates a service', () => {
        expect(service).toBeTruthy();
    });

    it('creates a customer', () => {
        let apiResponse: CustomerOutput | undefined;

        service.create(createCustomerPayloadStub).subscribe( resp => apiResponse = resp );

        const req = controller.expectOne(baseURLCustomersStub);
        req.flush(customerStub1);

        expect(apiResponse).toBeTruthy();
        expect(apiResponse).toEqual(customerStub1);
        expect(req.request.method).toEqual("POST");
    });
    it('retrives all customer', () => {
        let apiResponse: CustomerOutput[] | undefined;

        service.getAll().subscribe( resp => apiResponse = resp );

        const req = controller.expectOne(baseURLCustomersStub);
        req.flush(customerListStub);

        expect(apiResponse).toBeTruthy();
        expect(apiResponse).toEqual(customerListStub);
        expect(req.request.method).toEqual("GET");
    });
    it('retrives a specific customer with orders', () => {
        let apiResponse: CustomerDetail | undefined;

        service.getById(getCustomerIDStub).subscribe( resp => apiResponse = resp );

        const req = controller.expectOne(baseURLCustomersStub + `/${getCustomerIDStub}`);
        req.flush(customerStub1);

        expect(apiResponse).toBeTruthy();
        expect(apiResponse).toEqual(customerStub1);
        expect(req.request.method).toEqual("GET");
    });
});