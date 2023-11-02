package com.upgrad.bookmyconsultation.exception;

public class SlotUnavailableException extends RuntimeException {
    public SlotUnavailableException() {
        super();
    }

    public SlotUnavailableException(String message) {
        super(message);
    }

    public SlotUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
