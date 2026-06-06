package com.crm.util;

import org.springframework.data.domain.Page;

public final class PaginationUtil {

    private PaginationUtil() {
    }

    public static <T> PagedResponse<T> from(Page<T> page) {
        return new PagedResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}
