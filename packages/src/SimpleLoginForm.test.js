import React, { useReducer } from "react";
import { render, screen } from "@testing-library/react";
import { act, renderHook } from '@testing-library/react-hooks'
import SimpleLoginForm from "./SimpleLoginForm";
import formReducer from "./SimpleLoginForm";
describe("<SimpleLoginForm />", () => {
    test("rendered text", () => {
        render(<SimpleLoginForm />);
        expect(screen.getByText("Login Form")).toBeDefined();
    });


    test('check reducer', () => {
        const initialState = {
            SLF_username: {
                value: '',
                error: false,
                touched: false
            },
            SLF_password: {
                value: '',
                error: false,
                touched: false
            },
            errors: false
        };
        const newsState = {
            SLF_username: {
                value: 'test',
                error: false,
                touched: true
            },
            SLF_password: {
                value: '',
                error: false,
                touched: false
            },
            errors: false
        }

        const { result } = renderHook(() => useReducer(formReducer, initialState));
        const [formState, dispatch] = result.current;
        act(() => {

            dispatch({ type: 'HANDLE_INPUT_STATE', field: 'SLF_username', payload: 'test' });

        });

        setTimeout(() => {
            expect(formState).toEqual(newsState);
        }, 200);



        // or expect(state).toHaveLenth(3) if you prefer
    });
});