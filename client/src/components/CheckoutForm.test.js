import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>)
    const header = screen.getByText(/checkout form/i)
    expect(header).toBeInTheDocument()
});

test("form shows success message on submit with form details", async () => {
    render(<CheckoutForm/>)

    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const addressInput = screen.getByLabelText(/address/i)
    const cityInput = screen.getByLabelText(/city/i)
    const stateInput = screen.getByLabelText(/state/i)
    const zipInput = screen.getByLabelText(/zip/i)

    fireEvent.change(firstNameInput, {target:{value: 'David', name: 'firstName'}})
    fireEvent.change(lastNameInput, {target:{value: 'Chang', name: 'lastName'}})
    fireEvent.change(addressInput, {target:{value: '123 Sesame St', name: 'address'}})
    fireEvent.change(cityInput, {target:{value: 'Manhattan', name: 'city'}})
    fireEvent.change(stateInput, {target:{value: 'NY', name: 'state'}})
    fireEvent.change(zipInput, {target:{value: '90002', name: 'zip'}})

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const message = screen.getByTestId('successMessage')
    expect(message).toBeInTheDocument()

    const newFirstNameInput = await screen.findAllByText(/david/i)
    expect(newFirstNameInput).toBeTruthy()

    const newLastNameInput = await screen.findAllByText(/chang/i)
    expect(newLastNameInput).toBeTruthy()

    const newAddressInput = await screen.findAllByText(/123 sesame st/i)
    expect(newAddressInput).toBeTruthy()

    const newCityInput = await screen.findAllByText(/manhattan/i)
    expect(newCityInput).toBeTruthy()

    const newStateInput = await screen.findAllByText(/ny/i)
    expect(newStateInput).toBeTruthy()

    const newZipInput = await screen.findAllByText(/90002/i)
    expect(newZipInput).toBeTruthy()

});
