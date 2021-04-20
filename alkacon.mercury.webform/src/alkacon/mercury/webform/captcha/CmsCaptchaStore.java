/*
 * This library is part of OpenCms -
 * the Open Source Content Management System
 *
 * Copyright (c) Alkacon Software GmbH & Co. KG (http://www.alkacon.com)
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * For further information about Alkacon Software, please see the
 * company website: http://www.alkacon.com
 *
 * For further information about OpenCms, please see the
 * project website: http://www.opencms.org
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

package alkacon.mercury.webform.captcha;

import org.opencms.jsp.CmsJspActionElement;
import org.opencms.main.CmsLog;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.jsp.PageContext;

import org.apache.commons.logging.Log;

/**
 * Class that gives access to a concurrent captcha token store
 * on the application context level.
 */
public class CmsCaptchaStore {

    /** Name of the captcha store attribute */
    public static final String ATTRIBUTE_CAPTCHASTORE = "captchastore";

    /** The log object for this class. */
    private static final Log LOG = CmsLog.getLog(CmsCaptchaStore.class);

    /** The JSP context. */
    CmsJspActionElement m_jspActionElement;

    /**
     * Creates a new captcha store.
     * <p>
     *
     * @param jsp The JSP context
     */
    public CmsCaptchaStore(CmsJspActionElement jsp) {

        m_jspActionElement = jsp;
    }

    /**
     * Whether a captcha token is stored for a token ID.
     * <p>
     *
     * @param tokenId The token ID.
     * @return Whether a captcha token is available.
     */
    public boolean contains(String tokenId) {

        return getStore().containsKey(tokenId);
    }

    /**
     * Returns the stored captcha token for a given token ID.
     * @param tokenId The token ID
     * @return The stored captcha token.
     */
    public CmsCaptchaToken get(String tokenId) {

        return getStore().get(tokenId);
    }

    /**
     * Returns the internal captcha token store.
     * <p>
     *
     * @return The concurrent hash map storing the captcha tokens.
     */
    private Map<String, CmsCaptchaToken> getStore() {

        PageContext context = m_jspActionElement.getJspContext();
        if (context.getAttribute(ATTRIBUTE_CAPTCHASTORE, PageContext.APPLICATION_SCOPE) == null) {
            context.setAttribute(
                ATTRIBUTE_CAPTCHASTORE,
                new ConcurrentHashMap<String, CmsCaptchaToken>(),
                PageContext.APPLICATION_SCOPE);
        }
        return (Map<String, CmsCaptchaToken>)context.getAttribute(
            ATTRIBUTE_CAPTCHASTORE,
            PageContext.APPLICATION_SCOPE);
    }

    /**
     * Adds a captcha token for a given token ID to the store.
     * @param tokenId The token ID
     * @param captchaToken The captcha token
     */
    public void put(String tokenId, CmsCaptchaToken captchaToken) {

        getStore().putIfAbsent(tokenId, captchaToken);
    }

    /**
     * Removes a captcha token for a given token ID.
     * <p>
     *
     * @param tokenId The token ID of the captcha token to remove
     */
    public void remove(String tokenId) {

        getStore().remove(tokenId);
    }
}